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
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaExperiment = exports.processInteg = exports.getIntegId = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getIntegId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const integ = yield prisma.integrations.findFirst({
            //* marketplace code for wix is 21
            where: {
                user_id: id,
                marketplace_id: 21
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
const prismaExperiment = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.origins.findMany();
    console.log(data, 'prisma data integ');
    return data;
});
exports.prismaExperiment = prismaExperiment;
//# sourceMappingURL=integController.js.map