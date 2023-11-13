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
exports.RefreshToken = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
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
        const response = yield axios_1.default.post('https://www.wixapis.com/oauth/access', oauthRequest, {
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
//# sourceMappingURL=index.js.map