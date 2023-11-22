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
const auth_1 = require("../auth");
const files_1 = require("../files");
const wixController_1 = require("../controller/wixController");
// interface RefreshTokenRequestBody {
//     refresh_token: string;
// }
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
        const refreshToken = yield (0, auth_1.RefreshToken)();
        const order = yield (0, wixController_1.getAllOrders)(refreshToken);
        ctx.body = {
            order_response: order.data
            // prisma: prismaExperiment()
        };
        ctx.status = order.status;
        // console.log(prismaExperiment(), 'prisma experiment')
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