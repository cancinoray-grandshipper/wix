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
exports.getAppInstance = exports.getAccessToken = exports.getAccessTokensFromWix = exports.RefreshToken = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
const AUTH_PROVIDER_BASE_URL = 'https://www.wixapis.com/oauth';
const INSTANCE_API_URL = 'https://www.wixapis.com/apps/v1';
const RefreshToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Define the OAuth request parameters
        const oauthRequest = {
            grant_type: 'refresh_token',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            refresh_token: process.env.REFRESH_TOKEN
        };
        // Send the PUT request to the Wix OAuth Access API
        const response = yield axios_1.default.post(`${AUTH_PROVIDER_BASE_URL}/access`, oauthRequest, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    }
    catch (error) {
        console.error;
        console.error('Response Data:', error.response ? error.response.data : 'No response data');
        throw error;
    }
});
exports.RefreshToken = RefreshToken;
const getAccessTokensFromWix = (authCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = axios_1.default.post(`${AUTH_PROVIDER_BASE_URL}/access`, {
            code: authCode,
            client_secret: process.env.CLIENT_SECRET,
            client_id: process.env.CLIENT_ID,
            grant_type: 'authorization_code'
        });
        console.log(response, 'response!');
        return response;
    }
    catch (error) {
        console.error;
        console.error('Response Data:', error.response ? error.response.data : 'No response data');
    }
});
exports.getAccessTokensFromWix = getAccessTokensFromWix;
const getAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = axios_1.default.post(`${AUTH_PROVIDER_BASE_URL}/access`, {
            refresh_token: refreshToken,
            client_secret: process.env.CLIENT_SECRET,
            client_id: process.env.CLIENT_ID,
            grant_type: 'refresh_token'
        });
        return response;
    }
    catch (error) {
        console.error;
        console.error('Response Data:', error.response ? error.response.data : 'No response data');
    }
});
exports.getAccessToken = getAccessToken;
const getAppInstance = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`getAppInstance with refreshToken = ${refreshToken}`);
        console.log("==============================");
        const response = yield (0, exports.getAccessToken)(refreshToken);
        console.log(response.data.access_token, 'is there an access token here?');
        const access_token = response.data.access_token;
        console.log(`accessToken = ${access_token}`);
        const body = {
        // *** PUT YOUR PARAMS HERE ***
        //query: {limit: 10},
        };
        const options = {
            headers: {
                authorization: access_token,
            },
        };
        const appInstance = axios_1.default.create({
            baseURL: INSTANCE_API_URL,
            headers: { authorization: access_token }
        });
        const instance = (yield appInstance.get('instance', body)).data;
        return instance;
    }
    catch (e) {
        console.log('error in getAppInstance');
        console.log({ e });
        return;
    }
});
exports.getAppInstance = getAppInstance;
//# sourceMappingURL=index.js.map