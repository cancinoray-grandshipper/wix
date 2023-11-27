"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyFolder = exports.QueryOrders = exports.CreateAnotherOrder = exports.CreateOrder = void 0;
exports.CreateOrder = {
    "order": {
        "id": "7001d34b-11a6-4a34-8746-dc8ababeca42",
        "number": 10012,
        "dateCreated": "2023-03-07T10:24:03.380Z",
        "buyerInfo": {
            "id": "24de6f0b-60ce-4faa-9138-2e39f1415615",
            "type": "CONTACT",
            "identityType": "CONTACT",
            "firstName": "Jane",
            "lastName": "Doe",
            "phone": "0555555555",
            "email": "janedoe@gmail.com",
            "contactId": "24de6f0b-60ce-4faa-9138-2e39f1415615"
        },
        "currency": "USD",
        "weightUnit": "KG",
        "totals": {
            "subtotal": "130.00",
            "shipping": "10.0",
            "tax": "0.0",
            "discount": "10.0",
            "total": "130.00",
            "weight": "0",
            "quantity": 3
        },
        "billingInfo": {
            "paymentMethod": "In Person",
            "paymentGatewayTransactionId": "620fb6cf-c11f-4b29-8a37-d1bb550a5912",
            "address": {
                "fullName": {
                    "firstName": "Jane",
                    "lastName": "Doe"
                },
                "country": "US",
                "subdivision": "US-NY",
                "city": "New York",
                "zipCode": "10173",
                "phone": "0555555555",
                "email": "janedoe@gmail.com",
                "addressLine1": "525 5th Avenue"
            },
            "refundableByPaymentProvider": true
        },
        "shippingInfo": {
            "deliveryOption": "Standard US Shipping",
            "shippingRegion": "USA shipping",
            "code": "ed5bbce2-9533-dff4-7db0-13702fd139c5",
            "shipmentDetails": {
                "address": {
                    "fullName": {
                        "firstName": "Jane",
                        "lastName": "Doe"
                    },
                    "country": "US",
                    "subdivision": "US-NY",
                    "city": "New York",
                    "zipCode": "10173",
                    "phone": "0555555555",
                    "email": "janedoe@gmail.com",
                    "addressLine1": "525 5th Avenue",
                    "company": "Grandshipper"
                },
                "trackingInfo": {
                    "trackingNumber": "43255",
                    "shippingProvider": "FEDEX",
                    "trackingLink": "https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=43255"
                },
                "discount": "0",
                "tax": "0.0",
                "priceData": {
                    "taxIncludedInPrice": false,
                    "price": "10"
                }
            }
        },
        "buyerNote": "Happy Birthday!",
        "read": true,
        "archived": false,
        "paymentStatus": "PAID",
        "fulfillmentStatus": "PARTIALLY_FULFILLED",
        "lineItems": [
            {
                "index": 1,
                "quantity": 1,
                "price": "85.00",
                "name": "Shoe",
                "translatedName": "Shoe",
                "productId": "df19c1f7-07d8-a265-42f8-e8dfa824cc6e",
                "totalPrice": "85.00",
                "lineItemType": "PHYSICAL",
                "options": [
                    {
                        "option": "Color",
                        "selection": "Brown"
                    }
                ],
                "customTextFields": [],
                "mediaItem": {
                    "mediaType": "IMAGE",
                    "url": "https://static.wixstatic.com/media/3c76e2_bf235c38610f4d2a905db71095b351cf~mv2.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg",
                    "width": 1000,
                    "height": 1000,
                    "mediaId": "3c76e2_bf235c38610f4d2a905db71095b351cf~mv2.jpg",
                    "id": "3c76e2_bf235c38610f4d2a905db71095b351cf~mv2.jpg"
                },
                "sku": "364215376135191",
                "variantId": "2f430d69-9b75-4874-bfbd-c5f6fa5aff3d",
                "discount": "0",
                "tax": "0.0",
                "taxIncludedInPrice": false,
                "priceData": {
                    "taxIncludedInPrice": false,
                    "price": "85.00",
                    "totalPrice": "85.00"
                },
                "refundedQuantity": 0
            },
            {
                "index": 2,
                "quantity": 1,
                "price": "35.00",
                "name": "Watch",
                "translatedName": "Watch",
                "productId": "1a2d7e83-4bef-31d5-09e1-3326ee271c09",
                "totalPrice": "35.00",
                "lineItemType": "PHYSICAL",
                "options": [
                    {
                        "option": "Size",
                        "selection": "Large"
                    },
                    {
                        "option": "Color",
                        "selection": "Black"
                    }
                ],
                "customTextFields": [],
                "mediaItem": {
                    "mediaType": "IMAGE",
                    "url": "https://static.wixstatic.com/media/3c76e2_8891bbe3372a428aac976ac59aa0ac74~mv2.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg",
                    "width": 1000,
                    "height": 1000,
                    "mediaId": "3c76e2_8891bbe3372a428aac976ac59aa0ac74~mv2.jpg",
                    "id": "3c76e2_8891bbe3372a428aac976ac59aa0ac74~mv2.jpg"
                },
                "sku": "217537123517253",
                "variantId": "63f56c6d-8dcb-491c-8e06-0220b3cd89f2",
                "discount": "0",
                "tax": "0.0",
                "taxIncludedInPrice": false,
                "priceData": {
                    "taxIncludedInPrice": false,
                    "price": "35.00",
                    "totalPrice": "35.00"
                },
                "refundedQuantity": 0
            },
            {
                "index": 3,
                "quantity": 1,
                "price": "10.00",
                "name": "Shirt",
                "translatedName": "Shirt",
                "productId": "c8539b66-7a44-fe18-affc-afec4be8562a",
                "totalPrice": "10.00",
                "lineItemType": "PHYSICAL",
                "options": [],
                "customTextFields": [],
                "mediaItem": {
                    "mediaType": "IMAGE",
                    "url": "https://static.wixstatic.com/media/3c76e2_c5331f937348492a97df87b0a3b34ea4~mv2.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg",
                    "width": 1000,
                    "height": 1000,
                    "mediaId": "3c76e2_c5331f937348492a97df87b0a3b34ea4~mv2.jpg",
                    "id": "3c76e2_c5331f937348492a97df87b0a3b34ea4~mv2.jpg"
                },
                "sku": "364115376135191",
                "variantId": "00000000-0000-0000-0000-000000000000",
                "discount": "10.0",
                "tax": "0.0",
                "taxIncludedInPrice": false,
                "priceData": {
                    "taxIncludedInPrice": false,
                    "price": "10.00",
                    "totalPrice": "10.00"
                },
                "refundedQuantity": 0
            }
        ],
        "activities": [
            {
                "type": "ORDER_PLACED",
                "timestamp": "2023-03-07T10:24:03.380Z"
            },
            {
                "type": "TRACKING_NUMBER_ADDED",
                "timestamp": "2023-03-07T10:24:56.406Z"
            },
            {
                "type": "TRACKING_LINK_WAS_SET",
                "timestamp": "2023-03-07T10:24:56.406Z"
            },
            {
                "type": "ORDER_PARTIALLY_PAID",
                "timestamp": "2023-03-07T10:25:22.889Z"
            }
        ],
        "fulfillments": [
            {
                "id": "47451ae1-7325-4ef6-a0d8-fb91ffa88e2e",
                "dateCreated": "2023-03-07T10:24:56.406Z",
                "lineItems": [
                    {
                        "index": 1,
                        "quantity": 1
                    },
                    {
                        "index": 2,
                        "quantity": 1
                    }
                ],
                "trackingInfo": {
                    "trackingNumber": "43255",
                    "shippingProvider": "fedex",
                    "trackingLink": "https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=43255"
                }
            }
        ],
        "discount": {
            "value": "10.0",
            "appliedCoupon": {
                "couponId": "fbb94b06-7447-4161-9c48-59bfcdc39e77",
                "name": "SUMMERSALE10",
                "code": "SUMMERSALE10"
            }
        },
        "cartId": "1e61e838-d3a0-4ab7-8348-b37d1d954919",
        "buyerLanguage": "en",
        "channelInfo": {
            "type": "WEB"
        },
        "enteredBy": {
            "id": "24de6f0b-60ce-4faa-9138-2e39f1415615",
            "identityType": "CONTACT"
        },
        "lastUpdated": "2023-03-07T10:25:22.889Z",
        "numericId": "10012",
        "refunds": [],
        "checkoutId": "d118aa97-1bcb-462e-9265-3603f6e07df6",
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