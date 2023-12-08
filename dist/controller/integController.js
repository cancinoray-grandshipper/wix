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
exports.processDatabase = exports.saveInteg = exports.deleteIntegration = exports.updateInteg = exports.processInteg = exports.getIntegId = exports.getUserId = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
function getUserId(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const xtoken = ctx.get('x-auth-token') || ctx.get('authorization');
        const decoded = jsonwebtoken_1.default.verify(xtoken, process.env.JWT_KEY);
        const decodedString = JSON.stringify(decoded);
        const decodedParse = JSON.parse(decodedString);
        return decodedParse.id;
    });
}
exports.getUserId = getUserId;
function getIntegId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const integ = yield prisma.integrations.findFirst({
            //* marketplace code for wix is 21
            where: {
                user_id: id,
                marketplace_id: 21,
                deleted_at: { equals: null }
            }
        });
        if (integ !== null) {
            return integ.id;
        }
        else {
            return null;
        }
    });
}
exports.getIntegId = getIntegId;
function processInteg(integId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateIntegration = yield prisma.integrations.update({
                where: {
                    id: integId
                },
                data: {
                    last_synced_at: new Date()
                }
            });
            return updateIntegration;
        }
        catch (error) {
            console.error(error, "Error!");
        }
    });
}
exports.processInteg = processInteg;
function updateInteg(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = ctx.request.body;
        const id = body["id"];
        const name = body["name"];
        const nickname = body["nickname"];
        const active = body["active"];
        try {
            const updatedInteg = yield prisma.integrations.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    nickname,
                    active,
                    updated_at: new Date()
                }
            });
            ctx.status = 200;
            return updatedInteg;
        }
        catch (error) {
            console.error(error, "Error!");
            ctx.status = 400;
            return ctx.body = error;
        }
    });
}
exports.updateInteg = updateInteg;
function deleteIntegration(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield getUserId(ctx);
        const integrationId = +ctx.params.id;
        try {
            const deleteIntegSettings = yield prisma.integration_settings.updateMany({
                where: {
                    integration_id: integrationId
                },
                data: {
                    deleted_at: new Date()
                }
            });
            const deleteInteg = yield prisma.integrations.update({
                where: {
                    id: integrationId
                },
                data: {
                    deleted_at: new Date()
                }
            });
            ctx.status = 200;
        }
        catch (error) {
            ctx.body = error;
            ctx.status = 400;
            return ctx;
        }
    });
}
exports.deleteIntegration = deleteIntegration;
function saveInteg(ctx, userId, refreshToken, instanceId, siteDisplayName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if instanceId already exists
            const existingSetting = yield prisma.integration_settings.findFirst({
                where: {
                    name: 'instanceId',
                    value: instanceId,
                    deleted_at: { equals: null }
                },
            });
            if (existingSetting) {
                // instanceId already exists, handle accordingly (e.g., throw an error or log a message)
                console.error('instanceId already exists in integration_settings');
                return;
            }
            const saveInteg = yield prisma.integrations.create({
                data: {
                    user_id: userId,
                    marketplace_id: 21,
                    name: siteDisplayName,
                    active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            });
            const saveIntegId = saveInteg.id;
            console.log(saveIntegId, 'saveIntegId');
            yield prisma.integration_settings.createMany({
                data: [
                    { integration_id: saveIntegId, name: 'refreshToken', value: refreshToken, created_at: new Date(), updated_at: new Date() },
                    { integration_id: saveIntegId, name: 'instanceId', value: instanceId, created_at: new Date(), updated_at: new Date() }
                ]
            });
            return saveIntegId;
        }
        catch (error) {
            console.error("Error:", error);
            console.error("Response Data:", error.response ? error.response.data : "No response data");
            ctx.status = 500;
            ctx.body = "Internal Server Error";
        }
    });
}
exports.saveInteg = saveInteg;
function processDatabase(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(ctx.header.authorization, 'ctx is here');
        const userID = yield getUserId(ctx);
        const integrationId = +ctx.params.id;
        try {
            yield prisma.integrations.update({
                where: {
                    id: integrationId
                },
                data: {
                    user_id: userID
                },
            });
            ctx.status = 200;
        }
        catch (error) {
            console.error("Error:", error);
            console.error("Response Data:", error.response ? error.response.data : "No response data");
            ctx.status = 500;
            ctx.body = "Internal Server Error";
        }
    });
}
exports.processDatabase = processDatabase;
//# sourceMappingURL=integController.js.map