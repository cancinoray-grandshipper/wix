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
const koa_router_1 = __importDefault(require("koa-router"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../auth");
const files_1 = require("../files");
const wixController_1 = require("../controller/wixController");
const auth_2 = require("../auth");
const integController_1 = require("../controller/integController");
// interface RefreshTokenRequestBody {
//     refresh_token: string;
// }
// Load environment variables from the .env file
dotenv_1.default.config();
const incomingWebhooks = [];
const router = new koa_router_1.default();
router.get("/", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = "Wix!";
}));
router.get("/ping", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ctx.body = {
            status: "success",
            data: "pong",
            market: "Wix"
        };
    }
    catch (error) {
        console.log(error, "error");
    }
}));
router.post("/using-token", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Define the OAuth request parameters
        const refreshToken = yield (0, auth_1.RefreshToken)();
        // Handle the API response here
        // ctx.status = refreshToken.status;
        // ctx.body = refreshToken.data;
        ctx.body = {
            access_token: refreshToken.data.access_token,
        };
    }
    catch (error) {
        console.error("Error:", error);
        console.error("Response Data:", error.response ? error.response.data : "No response data");
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
}));
router.post("/orders", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = yield (0, auth_1.RefreshToken)();
        const order = yield axios_1.default.post('https://www.wixapis.com/stores/v2/orders', files_1.CreateOrder, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': refreshToken.data.access_token
            }
        });
        ctx.body = {
            body_response: order.data
        };
        ctx.status = order.status;
    }
    catch (error) {
        console.error("Error:", error);
        console.error("Response Data:", error.response ? error.response.data : "No response data");
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
}));
router.post("/orders-all", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = yield (0, auth_1.RefreshToken)();
        const order = yield axios_1.default.post('https://www.wixapis.com/stores/v2/orders/query', files_1.QueryOrders, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': refreshToken.data.access_token
            }
        });
        ctx.body = {
            order_response: order.data
        };
        ctx.status = order.status;
    }
    catch (error) {
        console.error("Error:", error);
        console.error("Response Data:", error.response ? error.response.data : "No response data");
        ctx.status = 500;
        ctx.body = "Internal Server Error";
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
//* saving the store
router.post('/ecomm/wix/integ/save', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const body = ctx.request.body;
        const name = body.name;
        const id = body.maskedId;
        const nickName = (_a = body.nickName) !== null && _a !== void 0 ? _a : '';
        console.log(body, 'this is the body in the ctx.request');
        // Redirect to the specified link
        ctx.redirect('https://www.wix.com/market?appMarketParams=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoie1wicm91dGVcIjpcInNoYXJlQXBwXCIsXCJhcHBEZWZJZFwiOlwiZjliNjc1ZTEtMTUwMy00Yjk1LTk0NzItMzNkNjhjMWQ0NDZmXCIsXCJzaGFyZUlkXCI6XCI1MTFiMzc0MS1lYTJjLTQyMmEtYTIxYS0xZDQxYjMyMjZjMDJcIixcInZlcnNpb25cIjpcImxhdGVzdFwifSIsImlhdCI6MTcwMTA2OTUyMX0.vumeq_MgagRyoJ2QKnclqAujhZXtl5uNq_eN-JF9FMU');
        const saveIntegCheck = yield (0, integController_1.saveInteg)(ctx, name, nickName, id);
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
router.get('/signup', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // This route is called before the user is asked to provide consent
    // Configure the `Redirect URL` in Wix Developers to point here
    // *** PUT YOUR SIGNUP CODE HERE *** ///
    console.log("got a call from Wix for signup");
    console.log("==============================");
    const permissionRequestUrl = 'https://www.wix.com/installer/install';
    const appId = process.env.CLIENT_ID; // Make sure to define APP_ID
    const redirectUrl = `https://${ctx.request.header.host}/login`;
    const token = ctx.query.token;
    const url = `${permissionRequestUrl}?token=${token}&appId=${appId}&redirectUrl=${redirectUrl}`;
    console.log("redirecting to " + url);
    console.log("=============================");
    ctx.redirect(url);
}));
router.get('/login', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // This route is called once the user finishes installing your application, and Wix redirects them to your application's site.
        // Configure the `App URL` in the Wix Developers to point here
        // *** PUT YOUR LOGIN CODE HERE *** ///
        console.log("got a call from Wix for login");
        console.log("=============================");
        const authorizationCode = ctx.query.code;
        console.log(`authorizationCode = ${authorizationCode}`);
        // Getting Tokens From Wix
        console.log("getting Tokens From Wix ");
        console.log("=======================");
        const data = yield (0, auth_2.getAccessTokensFromWix)(authorizationCode);
        const refreshToken = data.data.refresh_token;
        const accessToken = data.data.access_token;
        // console.log("refreshToken = " + refreshToken);
        console.log(`🚀🚀🚀refreshToken 🚀🚀🚀${refreshToken}`);
        console.log("=============================");
        console.log(`🚀🚀🚀accessToken 🚀🚀🚀${accessToken}`);
        console.log("=============================");
        const { instance: { instanceId } } = yield (0, auth_1.getAppInstance)(refreshToken);
        console.log("api call to instance returned: ");
        // console.log(instance);
        console.log(instanceId);
        // TODO: Save the instanceId and tokens for future API calls
        // console.log("=============================");
        // console.log(`User's site instanceId: ${instance.instance.instanceId}`);
        // console.log("=============================");
        // Render the login view
        // await ctx.render('login', {
        //   title: 'Wix Application',
        //   token: refreshToken,
        // });
    }
    catch (wixError) {
        console.log("Error getting token from Wix");
        console.log({ wixError });
        ctx.status = 500;
    }
}));
router.post('/webhook-callback', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const publicKey = process.env.PUBLIC_KEY;
    if (!publicKey) {
        throw new Error('Public key is not defined in the environment variables');
    }
    try {
        console.log('got webhook event from Wix!', ctx.request.body);
        console.log('===========================');
        // Assuming ctx.request.body is the payload received
        const data = jsonwebtoken_1.default.verify(ctx.request.body, publicKey);
        const parsedData = JSON.parse(data.data);
        const prettyData = Object.assign(Object.assign({}, data), { data: Object.assign(Object.assign({}, parsedData), { data: JSON.parse(parsedData.data) }) });
        console.log('webhook event data after verification:', prettyData);
        incomingWebhooks.push({ body: prettyData, headers: ctx.headers });
        ctx.body = ctx.request.body;
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
        console.error('Error processing webhook:', error);
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map