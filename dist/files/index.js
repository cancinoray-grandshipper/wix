"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyFolder = exports.QueryOrders = exports.CreateAnotherOrder = exports.CreateOrder = void 0;
exports.CreateOrder = {
    "order": {
        "dateCreated": "2021-05-25T13:51:01.718Z",
        "currency": "USD",
        "weightUnit": "KG",
        "totals": {
            "subtotal": "105.0",
            "shipping": "0.0",
            "tax": "0.0",
            "discount": "0.0",
            "total": "105",
            "weight": "0.75",
            "quantity": 3
        },
        "billingInfo": {
            "paymentMethod": "offline",
            "paymentGatewayTransactionId": "5c08a09b-867b-49bf-afeb-db59548419e0",
            "address": {
                "fullName": {
                    "firstName": "Jane",
                    "lastName": "Doe"
                },
                "country": "US",
                "subdivision": "US-NY",
                "city": "New York",
                "zipCode": "10011",
                "phone": "+1234567890",
                "email": "janedoe@gmail.com",
                "addressLine1": "235 West 23rd Street",
                "addressLine2": "3rd floor"
            },
            "paidDate": "2021-05-25T13:55:55.130Z"
        },
        "shippingInfo": {
            "deliveryOption": "U.S Shipping",
            "estimatedDeliveryTime": "3 - 5 business days",
            "shippingRegion": "Region 3",
            "code": "a0fde0a4-6f4e-3716-64be-c0acbde1696a",
            "shipmentDetails": {
                "address": {
                    "fullName": {
                        "firstName": "Ray",
                        "lastName": "Cancino"
                    },
                    "country": "US",
                    "subdivision": "US-NY",
                    "city": "New York",
                    "zipCode": "10011",
                    "phone": "+1234567890",
                    "email": "raycancino@gmail.com",
                    "addressLine1": "235 West 23rd Street",
                    "addressLine2": "3rd floor"
                },
                "trackingInfo": {
                    "trackingNumber": "12345",
                    "shippingProvider": "UPS",
                    "trackingLink": "https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=12345"
                },
                "discount": "0.0",
                "tax": "0.0",
                "priceData": {
                    "taxIncludedInPrice": false,
                    "price": "0.0"
                }
            }
        },
        "read": true,
        "archived": false,
        "paymentStatus": "PAID",
        "fulfillmentStatus": "NOT_FULFILLED",
        "lineItems": [
            {
                "index": 1,
                "quantity": 3,
                "price": "35.0",
                "name": "Indonesian Blend",
                "translatedName": "Indonesian Blend",
                "productId": "5376f9ec-b92e-efa9-e4a1-f4f480aa0d3a",
                "totalPrice": "105.0",
                "lineItemType": "PHYSICAL",
                "options": [
                    {
                        "option": "Weight",
                        "selection": "250g"
                    },
                    {
                        "option": "Ground for",
                        "selection": "Stovetop"
                    }
                ],
                "customTextFields": [
                    {
                        "title": "What would you like written on the custom label?",
                        "value": "Hope you enjoy the coffee! :)"
                    }
                ],
                "mediaItem": {
                    "mediaType": "IMAGE",
                    "url": "https://static.wixstatic.com/media/nsplsh_316b6449475f3235386255~mv2_d_2977_3951_s_4_2.jpg/v1/fit/w_2977,h_3951,q_90/file.jpg",
                    "width": 2977,
                    "height": 3951,
                    "mediaId": "nsplsh_316b6449475f3235386255~mv2_d_2977_3951_s_4_2.jpg",
                    "id": "nsplsh_316b6449475f3235386255~mv2_d_2977_3951_s_4_2.jpg"
                },
                "variantId": "00000000-0000-0020-0005-ad9cdc10d3b8",
                "discount": "0.0",
                "tax": "0.0",
                "taxIncludedInPrice": false,
                "priceData": {
                    "taxIncludedInPrice": false,
                    "price": "35.0",
                    "totalPrice": "105.0"
                },
                "refundedQuantity": 0
            },
        ],
        "fulfillments": [],
        "discount": {},
        "cartId": "d56e7d15-0f07-4723-9069-c90c5cdec230",
        "channelInfo": {
            "type": "WEB"
        },
        "enteredBy": {
            "id": "f61f30cd-7474-47b7-95a2-339c0fcacbd3",
            "identityType": "CONTACT"
        },
        "lastUpdated": "2021-05-25T13:55:55.130Z",
        "numericId": "10108",
        "refunds": [],
        "isInternalOrderCreate": false
    }
};
exports.CreateAnotherOrder = {
    "order": {
        "totals": {
            "subtotal": "20",
            "shipping": "3",
            "tax": "3",
            "discount": "10",
            "total": "100"
        },
        "billingInfo": {
            "paymentMethod": "PayPal",
            "paymentProviderTransactionId": "tx_1806",
            "address": {
                "fullName": {
                    "firstName": "John",
                    "lastName": "Smith"
                },
                "country": "US",
                "city": "New York",
                "zipCode": "92544",
                "phone": "+972 555234555",
                "email": "john.smith@example.com"
            }
        },
        "shippingInfo": {
            "deliveryOption": "Express",
            "estimatedDeliveryTime": "Today",
            "shippingRegion": "Domestic",
            "shipmentDetails": {
                "address": {
                    "fullName": {
                        "firstName": "Jan",
                        "lastName": "Smile"
                    },
                    "country": "US",
                    "city": "New York",
                    "zipCode": "92544",
                    "phone": "+972 555234555",
                    "email": "jan.smile@example.com"
                },
                "tax": "1",
                "priceData": {
                    "taxIncludedInPrice": false,
                    "price": "3"
                }
            }
        },
        "paymentStatus": "PAID",
        "lineItems": [
            {
                "quantity": 2,
                "discount": "1",
                "tax": "1",
                "name": "my product",
                "productId": "a1f9d337-f831-4529-31e6-67db8fd4e1aa",
                "lineItemType": "PHYSICAL",
                "weight": "15",
                "sku": "12345678",
                "priceData": {
                    "taxIncludedInPrice": false,
                    "price": "5"
                }
            }
        ],
        "channelInfo": {
            "type": "WEB"
        }
    }
};
// interface IQuery {
//     query: {
//       filter: string
//       paging: {
//         limit: number;
//       };
//       sort: string;
//     };
//   }
exports.QueryOrders = {
    'query': {
        'filter': '{"paymentStatus":"PAID"}',
        'paging': {
            'limit': 1,
        },
        'sort': '{"number": "desc"}'
    },
};
exports.MyFolder = {
    "folder": {
        "name": "My Folder",
        "parentId": "root"
    }
};
//# sourceMappingURL=index.js.map