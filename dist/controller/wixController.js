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
exports.syncOrders = exports.getAllOrders = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const integController_1 = require("./integController");
const auth_1 = require("../auth");
const prisma = new client_1.PrismaClient();
// export const getOrders = async(ctx:any) =>  {
//   let userId:any
//   if(ctx.get('maskedId') > 0) {
//     userId = ctx.get('maskedId')
//     userId = parseInt(userId);
//   } else {
//     userId = await getUserId(ctx)
//   }
// }
const getAllOrders = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let userId;
    if (ctx.get('maskedId') > 0) {
        userId = ctx.get('maskedId');
        userId = parseInt(userId);
    }
    else {
        userId = yield (0, integController_1.getUserId)(ctx);
    }
    const integId = yield (0, integController_1.getIntegId)(userId);
    console.log(integId, '🚀 this is the integration ID');
    let index;
    try {
        index = yield (0, integController_1.processInteg)(integId);
    }
    catch (error) {
        console.error(error, "Error!");
    }
    console.log(index, '🚀 this is the index');
    // ? It should be separated. we just want to get the credential to get the access_token
    // const wixClientId = await prisma?.integration_settings.findFirst({
    //   where: {
    //     integration_id: integId,
    //     name: "wixClientId"
    //   }
    // })
    // console.log(wixClientId, 'this is the wix client id!')
    const gsOrders = yield prisma.orders.findMany({
        where: {
            user_id: userId,
            integration_id: integId,
            deleted_at: null
        }
    });
    // console.log(gsOrders, '🚀 this is the order')
    const gsOrigin = yield prisma.origins.findFirst({
        where: {
            user_id: userId,
            is_default: true
        }
    });
    console.log(gsOrigin, '🚀 this is the default origin of the user');
    //* id of the origin address
    const originId = gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.id;
    console.log(originId, '🚀 this is the default origin id of the user');
    //* extracted from the gsOrigin
    const originJson = `{\"id\":${gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.id},\"first_name\":\"${gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.first_name}\",\"last_name\":\"${gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.last_name}\",\"company\":\"${gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.company}\",\"address\":\"${gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.address}\",\"city\":\"${gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.city}\",\"state\":\"${gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.state}\",\"postal\":\"${gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.postal}\",\"postal_origin\":\"${gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.postal_origin}\",\"country\":\"${gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.country}\",\"phone\":\"${gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.phone}\",\"is_default\":1,\"timezone\":\"${gsOrigin === null || gsOrigin === void 0 ? void 0 : gsOrigin.timezone}\"}`;
    console.log(originJson, '🚀 this is the default origin id of the user (json)');
    let gsOrderId = [];
    let arrayShippings = [];
    let arrayOrders = [];
    let arrayOrderItems = [];
    //* Getting order from the store
    //* Define the OAuth request parameters
    const refreshToken = yield (0, auth_1.RefreshToken)();
    const QueryOrders = {
        'query': {
            'filter': '{"paymentStatus":"PAID"}',
            'paging': {
                'limit': 100,
            },
            'sort': '[{"number": "desc"}]'
        },
    };
    const orders = yield axios_1.default.post('https://www.wixapis.com/stores/v2/orders/query', QueryOrders, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': refreshToken.data.access_token
        }
    });
    gsOrders.forEach(gsOrder => {
        if (gsOrder.id)
            gsOrderId.push(gsOrder.remote_id);
    });
    // console.log(gsOrderId, '🚀 gsOrderId')
    //* mapping the response json to the database
    (_b = (_a = orders === null || orders === void 0 ? void 0 : orders.data) === null || _a === void 0 ? void 0 : _a.orders) === null || _b === void 0 ? void 0 : _b.forEach((item) => {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!(gsOrderId === null || gsOrderId === void 0 ? void 0 : gsOrderId.includes((item === null || item === void 0 ? void 0 : item.id)))) {
            const shippingData = {
                user_id: userId,
                first_name: item.shippingInfo.shipmentDetails.address.fullName.firstName,
                last_name: item.shippingInfo.shipmentDetails.address.fullName.lastName,
                company: (_b = (_a = item.shippingInfo.shipmentDetails.address) === null || _a === void 0 ? void 0 : _a.company) !== null && _b !== void 0 ? _b : null,
                address: (_d = (_c = item.shippingInfo.shipmentDetails.address) === null || _c === void 0 ? void 0 : _c.addressLine1) !== null && _d !== void 0 ? _d : null,
                address2: (_f = (_e = item.shippingInfo.shipmentDetails.address) === null || _e === void 0 ? void 0 : _e.addressLine2) !== null && _f !== void 0 ? _f : null,
                city: item.shippingInfo.shipmentDetails.address.city,
                province: (_g = item.shippingInfo.shipmentDetails.address.subdivision) !== null && _g !== void 0 ? _g : null,
                postal_code: item.shippingInfo.shipmentDetails.address.zipCode,
                country: item.shippingInfo.shipmentDetails.address.country,
                phone: item.shippingInfo.shipmentDetails.address.phone,
                email: item.shippingInfo.shipmentDetails.address.email,
                created_at: new Date(),
                updated_at: new Date(),
            };
            const orderData = {
                parent_id: item.number,
                user_id: userId,
                integration_id: integId,
                marketplace_id: 21,
                remote_id: item.id,
                total_price: item.totals.total,
                special_services: '',
                order_status_id: 1,
                description: item.billingInfo.paymentMethod,
                created_at: new Date(),
                updated_at: new Date(),
                order_number: item.numericId,
                weight_unit: item.weightUnit,
                total_weight: item.totals.weight
            };
            const lineItems = item.lineItems.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                sku: item.sku,
                created_at: new Date(),
                updated_at: new Date()
            }));
            arrayShippings.push(shippingData);
            arrayOrders.push(orderData);
            arrayOrderItems.push(lineItems);
        }
    });
    // console.log(arrayOrderItems, `this is the items ${arrayOrderItems.length}`)
    let gsShippingIds = [];
    //* saving to the shipping_addresses table
    const createShippingAddress = arrayShippings.map((shipping) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d, _e, _f, _g;
        const createdShipping = yield prisma.shipping_addresses.create({
            data: {
                user_id: shipping.user_id,
                first_name: shipping.first_name,
                last_name: shipping.last_name,
                company: (_c = shipping.company) !== null && _c !== void 0 ? _c : null,
                address: (_d = shipping.address) !== null && _d !== void 0 ? _d : null,
                address2: (_e = shipping.address2) !== null && _e !== void 0 ? _e : null,
                city: shipping.city,
                province: (_g = (_f = shipping.province) === null || _f === void 0 ? void 0 : _f.split('-')[1]) !== null && _g !== void 0 ? _g : null,
                postal_code: shipping.postal_code,
                country: shipping.country,
                phone: shipping.phone,
                email: shipping.email,
                marketplace_id: 21,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });
        gsShippingIds.push(createdShipping.id);
        // console.log(createdShipping, '🚀 after createdShipping ')
    }));
    // console.log(gsShippingIds, 'gsShipping Ids')
    yield Promise.all(createShippingAddress);
    const shipping_service = yield prisma.shipping_services.findFirst({
        where: {
            code: 'UGA',
        },
    });
    let order_id = [];
    //* saving to the order table
    const createOrder = arrayOrders.map((order, index) => __awaiter(void 0, void 0, void 0, function* () {
        order.weight_unit == "LB" ? order.weight_unit : Math.floor(order.total_weight * 2.20462);
        // console.log(order.total_weight, '🚀 weight is now in lb')
        const createdOrder = yield prisma.orders.create({
            data: {
                user_id: order.user_id,
                integration_id: order.integration_id,
                marketplace_id: order.marketplace_id,
                shipping_address_id: gsShippingIds[index],
                remote_id: order.remote_id,
                total_price: order.total_price,
                package_type: 'PKG',
                shipping_service_id: shipping_service === null || shipping_service === void 0 ? void 0 : shipping_service.id,
                special_services: shipping_service === null || shipping_service === void 0 ? void 0 : shipping_service.special_services,
                future_shipping: false,
                order_status_id: 2,
                description: order.description,
                created_at: new Date(),
                updated_at: new Date(),
                parent_id: order.parent_id,
                is_parent: false,
                origin_json: originJson,
                order_number: order === null || order === void 0 ? void 0 : order.order_number,
                total_weight: order.total_weight
            }
        });
        order_id.push(createdOrder.id);
    }));
    yield Promise.all(createOrder);
    const createOrderItem = arrayOrderItems.map((item, index) => __awaiter(void 0, void 0, void 0, function* () {
        item.map((list) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.order_items.create({
                data: {
                    order_id: order_id[index],
                    name: list.name,
                    price: list.price,
                    quantity: list.quantity,
                    created_at: list.created_at,
                    updated_at: list.updated_at,
                    sku: list.sku
                }
            });
        }));
    }));
    yield Promise.all(createOrderItem);
    const allOrders = yield (0, exports.syncOrders)(ctx);
    ctx.status = 200;
    return ctx.body = [index, allOrders];
});
exports.getAllOrders = getAllOrders;
const syncOrders = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let userId;
    const integId = yield (0, integController_1.getIntegId)(userId);
    console.log(integId, '🚀 this is the integration ID');
    const gsOrders = yield prisma.orders.findMany({
        where: {
            user_id: userId,
            integration_id: integId
        }
    });
    return gsOrders;
});
exports.syncOrders = syncOrders;
//# sourceMappingURL=wixController.js.map