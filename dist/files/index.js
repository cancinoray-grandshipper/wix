"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryOrders = exports.CreateAnotherOrder = exports.CreateOrder = void 0;
exports.CreateOrder = {
    "order": {
        "id": "8781efa4-0df9-4184-9201-ca26c99f9fb2",
        "number": 10004,
        "dateCreated": "2023-11-09T17:49:15.168Z",
        "currency": "PHP",
        "weightUnit": "KG",
        "totals": {
            "subtotal": "50",
            "shipping": "3",
            "tax": "3",
            "discount": "1",
            "total": "15",
            "weight": "30",
            "quantity": 5
        },
        "billingInfo": {
            "paymentMethod": "PayPal",
            "externalTransactionId": "tx_1806",
            "paymentProviderTransactionId": "tx_1806",
            "address": {
                "fullName": {
                    "firstName": "Ray",
                    "lastName": "Cancino"
                },
                "country": "US",
                "city": "New York",
                "zipCode": "92544",
                "phone": "+972 555234555",
                "email": "Ivanushka@example.com"
            },
            "paidDate": "2023-11-09T17:49:15.240Z"
        },
        "shippingInfo": {
            "deliveryOption": "Express",
            "estimatedDeliveryTime": "Today",
            "shippingRegion": "Domestic",
            "shipmentDetails": {
                "address": {
                    "fullName": {
                        "firstName": "Z",
                        "lastName": "Cancino"
                    },
                    "country": "US",
                    "city": "New York",
                    "zipCode": "92544",
                    "phone": "+972 555234555",
                    "email": "Ivanushka@example.com"
                },
                "discount": "0",
                "tax": "1",
                "priceData": {
                    "taxIncludedInPrice": false,
                    "price": "3"
                }
            }
        },
        "read": false,
        "archived": false,
        "paymentStatus": "PAID",
        "fulfillmentStatus": "NOT_FULFILLED",
        "lineItems": [
            {
                "index": 1,
                "quantity": 2,
                "price": "5",
                "name": "my product",
                "productId": "a1f9d337-f831-4529-31e6-67db8fd4e1aa",
                "totalPrice": "10",
                "lineItemType": "PHYSICAL",
                "options": [],
                "customTextFields": [],
                "weight": "15",
                "sku": "12345678",
                "discount": "1",
                "tax": "1",
                "taxIncludedInPrice": false,
                "priceData": {
                    "taxIncludedInPrice": false,
                    "price": "5",
                    "totalPrice": "10"
                },
                "refundedQuantity": 0
            }
        ],
        "activities": [
            {
                "type": "ORDER_PLACED",
                "timestamp": "2023-11-09T17:49:15.168Z"
            },
            {
                "type": "ORDER_PAID",
                "timestamp": "2023-11-09T17:49:15.240Z"
            }
        ],
        "fulfillments": [],
        "buyerLanguage": "en",
        "channelInfo": {
            "type": "WEB"
        },
        "enteredBy": {
            "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
            "identityType": "APP"
        },
        "lastUpdated": "2023-11-09T17:49:15.240Z",
        "numericId": "10004",
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
            'limit': 100,
        },
        'sort': '[{"number": "desc"}]'
    },
};
//# sourceMappingURL=index.js.map