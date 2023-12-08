"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const koa_router_1 = __importDefault(require("koa-router"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../auth");
const wixController_1 = require("../controller/wixController");
const auth_2 = require("../auth");
const integController_1 = require("../controller/integController");
// Load environment variables from the .env file
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const incomingWebhooks = [];
const router = new koa_router_1.default();
router.get("/", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = "Wix!";
}));
//* testing
router.get("/ping", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ctx.body = {
            status: "success",
            data: "pong",
            market: "Wix"
        };
        console.log(ctx, '🚀 this is the received ctx');
    }
    catch (error) {
        console.log(error, "error");
    }
}));
router.get('/ecomm/wix/orders/get', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, wixController_1.getAllOrders)(ctx);
    }
    catch (error) {
        console.error("Error:", error);
        console.error("Response Data:", error.response ? error.response.data : "No response data");
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
}));
router.put('/ecomm/wix/integ/update', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, integController_1.updateInteg)(ctx);
    }
    catch (error) {
        console.error("Error:", error);
        console.error("Response Data:", error.response ? error.response.data : "No response data");
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
}));
router.delete('/ecomm/wix/order/delete/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, wixController_1.deleteOrder)(ctx);
    }
    catch (error) {
        console.error("Error:", error);
        console.error("Response Data:", error.response ? error.response.data : "No response data");
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
}));
router.delete('/ecomm/wix/integ/delete/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, integController_1.deleteIntegration)(ctx);
    }
    catch (error) {
        console.error("Error:", error);
        console.error("Response Data:", error.response ? error.response.data : "No response data");
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
}));
router.put('/ecomm/wix/fulfillment', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, wixController_1.fulfilOrder)(ctx);
        ctx.body = { message: 'Order Completed!' };
    }
    catch (error) {
        console.error("Error:", error);
        console.error("Response Data:", error.response ? error.response.data : "No response data");
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
}));
router.get('/signup', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // This route is called before the user is asked to provide consent
    // Configure the `Redirect URL` in Wix Developers to point here
    const permissionRequestUrl = 'https://www.wix.com/installer/install';
    const appId = process.env.CLIENT_ID; // Make sure to define APP_ID
    const redirectUrl = `https://${ctx.request.header.host}/login`;
    const token = ctx.query.token;
    const url = `${permissionRequestUrl}?token=${token}&appId=${appId}&redirectUrl=${redirectUrl}`;
    ctx.redirect(url);
}));
router.get('/login', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // This route is called once the user finishes installing your application, and Wix redirects them to your application's site.
        // Configure the `App URL` in the Wix Developers to point here
        const authorizationCode = ctx.query.code;
        // Getting Tokens From Wix
        const data = yield (0, auth_2.getAccessTokensFromWix)(authorizationCode);
        const refreshToken = data.data.refresh_token;
        const accessToken = data.data.access_token;
        const { instance: { instanceId }, site: { siteDisplayName } } = yield (0, auth_1.getAppInstance)(refreshToken);
        // console.log(instance);
        // console.log('Instance ID:', instanceId);
        // console.log('Site Display Name:', siteDisplayName);
        // TODO: Save the instanceId and tokens for future API calls
        // TODO: I need to save the instanceID, siteDisplayName and refreshToken in the database
        //* temporarily saved the user store in user_id = 3
        const userId = 3;
        // console.log(userId, 'before saveInteg')
        const integID = yield (0, integController_1.saveInteg)(ctx, userId, refreshToken, instanceId, siteDisplayName);
        console.log(integID, 'integID');
        ctx.status = 301;
        //* after redirecting to the url, frontend will fireup to pass the auth token and extract the user_id of the user
        //* and called the route /ecomm/wix/process/:id
        ctx.redirect(`${process.env.REDIRECT_TO}?ecomm=wix&i=${integID}`);
    }
    catch (error) {
        console.error("Error:", error);
        console.error("Response Data:", error.response ? error.response.data : "No response data");
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
}));
router.post('/webhook-callback', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const publicKey = process.env.PUBLIC_KEY;
    if (!publicKey) {
        throw new Error('Public key is not defined in the environment variables');
    }
    try {
        // Assuming ctx.request.body is the payload received
        const data = jsonwebtoken_1.default.verify(ctx.request.body, publicKey);
        const parsedData = JSON.parse(data.data);
        const prettyData = Object.assign(Object.assign({}, data), { data: Object.assign(Object.assign({}, parsedData), { data: JSON.parse(parsedData.data) }) });
        // console.log('webhook event data after verification:', prettyData);
        incomingWebhooks.push({ body: prettyData, headers: ctx.headers });
        ctx.body = ctx.request.body;
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
        console.error('Error processing webhook:', error);
    }
}));
router.patch('/ecomm/wix/process/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, integController_1.processDatabase)(ctx);
    }
    catch (error) {
        console.error("Error:", error);
        console.error("Response Data:", error.response ? error.response.data : "No response data");
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map