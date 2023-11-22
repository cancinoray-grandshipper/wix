"use strict";
const sampleReturn = {
    "orders": [
        {
            "id": "273c06a1-2248-45db-9004-c4a66e547b46",
            "number": 10015,
            "dateCreated": "2023-11-10T03:40:48.030Z",
            "buyerInfo": {
                "id": "5588cc3c-1f67-46c2-affe-ff80a526af86",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "john.smith@example.com",
                "contactId": "5588cc3c-1f67-46c2-affe-ff80a526af86"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "20",
                "shipping": "3",
                "tax": "3",
                "discount": "10",
                "total": "100",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
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
                },
                "paidDate": "2023-11-10T03:40:48.097Z",
                "refundableByPaymentProvider": true
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
                        "email": "john.smith@example.com"
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
                    "weight": "15.0",
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
                    "timestamp": "2023-11-10T03:40:48.030Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-10T03:40:48.097Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "10"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-10T03:40:48.611Z",
            "numericId": "10015",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "107e2336-ef1a-4eeb-915f-d626210f4f66",
            "number": 10014,
            "dateCreated": "2023-11-10T03:11:50.687Z",
            "buyerInfo": {
                "id": "5588cc3c-1f67-46c2-affe-ff80a526af86",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "john.smith@example.com",
                "contactId": "5588cc3c-1f67-46c2-affe-ff80a526af86"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "20",
                "shipping": "3",
                "tax": "3",
                "discount": "10",
                "total": "100",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
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
                },
                "paidDate": "2023-11-10T03:11:50.873Z",
                "refundableByPaymentProvider": true
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
                        "email": "john.smith@example.com"
                    },
                    "discount": "0",
                    "tax": "1",
                    "priceData": {
                        "taxIncludedInPrice": false,
                        "price": "3"
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
                    "quantity": 2,
                    "price": "5",
                    "name": "my product",
                    "productId": "a1f9d337-f831-4529-31e6-67db8fd4e1aa",
                    "totalPrice": "10",
                    "lineItemType": "PHYSICAL",
                    "options": [],
                    "customTextFields": [],
                    "weight": "15.0",
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
                    "timestamp": "2023-11-10T03:11:50.687Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-10T03:11:50.873Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "10"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-10T03:12:29.701Z",
            "numericId": "10014",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "19dd2239-b410-49d5-9781-ebf6d01b14bf",
            "number": 10013,
            "dateCreated": "2023-11-10T03:08:46.101Z",
            "buyerInfo": {
                "id": "5588cc3c-1f67-46c2-affe-ff80a526af86",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "john.smith@example.com",
                "contactId": "5588cc3c-1f67-46c2-affe-ff80a526af86"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "500",
                "shipping": "3",
                "tax": "3",
                "discount": "10",
                "total": "15",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
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
                },
                "paidDate": "2023-11-10T03:08:46.174Z",
                "refundableByPaymentProvider": true
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
                        "email": "john.smith@example.com"
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
                    "weight": "15.0",
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
                    "timestamp": "2023-11-10T03:08:46.101Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-10T03:08:46.174Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "10"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-10T03:08:46.736Z",
            "numericId": "10013",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "645365b6-eeb3-423f-a670-592d08dd7314",
            "number": 10012,
            "dateCreated": "2023-11-10T02:59:07.089Z",
            "buyerInfo": {
                "id": "46d33121-602d-4ac0-94c0-21eff265dec5",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "Ray",
                "lastName": "Cancino",
                "phone": "+972 555234555",
                "email": "Ivanushka@example.com",
                "contactId": "46d33121-602d-4ac0-94c0-21eff265dec5"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "50",
                "shipping": "3",
                "tax": "3",
                "discount": "1",
                "total": "15",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
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
                "paidDate": "2023-11-10T02:59:07.153Z",
                "refundableByPaymentProvider": true
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
                    "weight": "15.0",
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
                    "timestamp": "2023-11-10T02:59:07.089Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-10T02:59:07.153Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "1"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-10T02:59:07.878Z",
            "numericId": "10012",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "5d14784b-17fd-48ea-ac39-06457cad99e1",
            "number": 10011,
            "dateCreated": "2023-11-10T02:55:38.156Z",
            "buyerInfo": {
                "id": "46d33121-602d-4ac0-94c0-21eff265dec5",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "Ivanushka@example.com",
                "contactId": "46d33121-602d-4ac0-94c0-21eff265dec5"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "50",
                "shipping": "3",
                "tax": "3",
                "discount": "1",
                "total": "15",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
                "address": {
                    "fullName": {
                        "firstName": "John",
                        "lastName": "Smith"
                    },
                    "country": "US",
                    "city": "New York",
                    "zipCode": "92544",
                    "phone": "+972 555234555",
                    "email": "Ivanushka@example.com"
                },
                "paidDate": "2023-11-10T02:55:38.246Z",
                "refundableByPaymentProvider": true
            },
            "shippingInfo": {
                "deliveryOption": "Express",
                "estimatedDeliveryTime": "Today",
                "shippingRegion": "Domestic",
                "shipmentDetails": {
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
                    "weight": "15.0",
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
                    "timestamp": "2023-11-10T02:55:38.156Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-10T02:55:38.246Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "1"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-10T02:55:38.759Z",
            "numericId": "10011",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "19c55bab-6090-4a2d-9939-8c148e3f1cf3",
            "number": 10010,
            "dateCreated": "2023-11-10T02:55:19.095Z",
            "buyerInfo": {
                "id": "46d33121-602d-4ac0-94c0-21eff265dec5",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "Ivanushka@example.com",
                "contactId": "46d33121-602d-4ac0-94c0-21eff265dec5"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "50",
                "shipping": "3",
                "tax": "3",
                "discount": "1",
                "total": "15",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
                "address": {
                    "fullName": {
                        "firstName": "John",
                        "lastName": "Smith"
                    },
                    "country": "US",
                    "city": "New York",
                    "zipCode": "92544",
                    "phone": "+972 555234555",
                    "email": "Ivanushka@example.com"
                },
                "paidDate": "2023-11-10T02:55:19.170Z",
                "refundableByPaymentProvider": true
            },
            "shippingInfo": {
                "deliveryOption": "Express",
                "estimatedDeliveryTime": "Today",
                "shippingRegion": "Domestic",
                "shipmentDetails": {
                    "address": {
                        "fullName": {
                            "firstName": "John",
                            "lastName": "Smith"
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
                    "weight": "15.0",
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
                    "timestamp": "2023-11-10T02:55:19.095Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-10T02:55:19.170Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "1"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-10T02:55:19.702Z",
            "numericId": "10010",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "d4d9b7ea-6662-4261-8b30-33d4f6cbd136",
            "number": 10009,
            "dateCreated": "2023-11-10T02:53:59.907Z",
            "buyerInfo": {
                "id": "46d33121-602d-4ac0-94c0-21eff265dec5",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "Ivanushka@example.com",
                "contactId": "46d33121-602d-4ac0-94c0-21eff265dec5"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "50",
                "shipping": "3",
                "tax": "3",
                "discount": "1",
                "total": "15",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
                "address": {
                    "fullName": {
                        "firstName": "John",
                        "lastName": "Smith"
                    },
                    "country": "US",
                    "city": "New York",
                    "zipCode": "92544",
                    "phone": "+972 555234555",
                    "email": "Ivanushka@example.com"
                },
                "paidDate": "2023-11-10T02:53:59.975Z",
                "refundableByPaymentProvider": true
            },
            "shippingInfo": {
                "deliveryOption": "Express",
                "estimatedDeliveryTime": "Today",
                "shippingRegion": "Domestic",
                "shipmentDetails": {
                    "address": {
                        "fullName": {
                            "firstName": "John",
                            "lastName": "Smith"
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
                    "weight": "15.0",
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
                    "timestamp": "2023-11-10T02:53:59.907Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-10T02:53:59.975Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "1"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-10T02:54:00.462Z",
            "numericId": "10009",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "2398728b-9e89-4297-9cb9-4729f13b945d",
            "number": 10008,
            "dateCreated": "2023-11-10T02:53:42.197Z",
            "buyerInfo": {
                "id": "46d33121-602d-4ac0-94c0-21eff265dec5",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "Ivanushka@example.com",
                "contactId": "46d33121-602d-4ac0-94c0-21eff265dec5"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "50",
                "shipping": "3",
                "tax": "3",
                "discount": "1",
                "total": "15",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
                "address": {
                    "fullName": {
                        "firstName": "John",
                        "lastName": "Smith"
                    },
                    "country": "US",
                    "city": "New York",
                    "zipCode": "92544",
                    "phone": "+972 555234555",
                    "email": "Ivanushka@example.com"
                },
                "paidDate": "2023-11-10T02:53:47.869Z",
                "refundableByPaymentProvider": true
            },
            "shippingInfo": {
                "deliveryOption": "Express",
                "estimatedDeliveryTime": "Today",
                "shippingRegion": "Domestic",
                "shipmentDetails": {
                    "address": {
                        "fullName": {
                            "firstName": "John",
                            "lastName": "Smith"
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
                    "weight": "15.0",
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
                    "timestamp": "2023-11-10T02:53:42.197Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-10T02:53:47.869Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "1"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-10T02:53:48.567Z",
            "numericId": "10008",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "2dc363aa-ba91-4a7d-a4d2-8def423685bd",
            "number": 10007,
            "dateCreated": "2023-11-10T02:50:59.308Z",
            "buyerInfo": {
                "id": "46d33121-602d-4ac0-94c0-21eff265dec5",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "Ivanushka@example.com",
                "contactId": "46d33121-602d-4ac0-94c0-21eff265dec5"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "50",
                "shipping": "3",
                "tax": "3",
                "discount": "1",
                "total": "15",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
                "address": {
                    "fullName": {
                        "firstName": "John",
                        "lastName": "Smith"
                    },
                    "country": "US",
                    "city": "New York",
                    "zipCode": "92544",
                    "phone": "+972 555234555",
                    "email": "Ivanushka@example.com"
                },
                "paidDate": "2023-11-10T02:50:59.422Z",
                "refundableByPaymentProvider": true
            },
            "shippingInfo": {
                "deliveryOption": "Express",
                "estimatedDeliveryTime": "Today",
                "shippingRegion": "Domestic",
                "shipmentDetails": {
                    "address": {
                        "fullName": {
                            "firstName": "John",
                            "lastName": "Smith"
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
                    "weight": "15.0",
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
                    "timestamp": "2023-11-10T02:50:59.308Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-10T02:50:59.422Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "1"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-10T02:50:59.919Z",
            "numericId": "10007",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "59fb4be4-0601-4207-b2fc-c6b29c64c5c9",
            "number": 10006,
            "dateCreated": "2023-11-10T02:50:34.558Z",
            "buyerInfo": {
                "id": "46d33121-602d-4ac0-94c0-21eff265dec5",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "Ivanushka@example.com",
                "contactId": "46d33121-602d-4ac0-94c0-21eff265dec5"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "50",
                "shipping": "3",
                "tax": "3",
                "discount": "1",
                "total": "15",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
                "address": {
                    "fullName": {
                        "firstName": "John",
                        "lastName": "Smith"
                    },
                    "country": "US",
                    "city": "New York",
                    "zipCode": "92544",
                    "phone": "+972 555234555",
                    "email": "Ivanushka@example.com"
                },
                "paidDate": "2023-11-10T02:50:34.649Z",
                "refundableByPaymentProvider": true
            },
            "shippingInfo": {
                "deliveryOption": "Express",
                "estimatedDeliveryTime": "Today",
                "shippingRegion": "Domestic",
                "shipmentDetails": {
                    "address": {
                        "fullName": {
                            "firstName": "John",
                            "lastName": "Smith"
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
                    "weight": "15.0",
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
                    "timestamp": "2023-11-10T02:50:34.558Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-10T02:50:34.649Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "1"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-10T02:50:35.185Z",
            "numericId": "10006",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "3ad77429-dd36-4594-a4fa-d84224eaa43c",
            "number": 10005,
            "dateCreated": "2023-11-09T18:01:56.175Z",
            "buyerInfo": {
                "id": "46d33121-602d-4ac0-94c0-21eff265dec5",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "Ivanushka@example.com",
                "contactId": "46d33121-602d-4ac0-94c0-21eff265dec5"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "50",
                "shipping": "3",
                "tax": "3",
                "discount": "1",
                "total": "15",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
                "address": {
                    "fullName": {
                        "firstName": "John",
                        "lastName": "Smith"
                    },
                    "country": "US",
                    "city": "New York",
                    "zipCode": "92544",
                    "phone": "+972 555234555",
                    "email": "Ivanushka@example.com"
                },
                "paidDate": "2023-11-09T18:01:56.254Z",
                "refundableByPaymentProvider": true
            },
            "shippingInfo": {
                "deliveryOption": "Express",
                "estimatedDeliveryTime": "Today",
                "shippingRegion": "Domestic",
                "shipmentDetails": {
                    "address": {
                        "fullName": {
                            "firstName": "John",
                            "lastName": "Smith"
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
                    "weight": "15.0",
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
                    "timestamp": "2023-11-09T18:01:56.175Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-09T18:01:56.254Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "1"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-09T18:01:56.921Z",
            "numericId": "10005",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "8781efa4-0df9-4184-9201-ca26c99f9fa8",
            "number": 10004,
            "dateCreated": "2023-11-09T17:49:15.168Z",
            "buyerInfo": {
                "id": "46d33121-602d-4ac0-94c0-21eff265dec5",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "Ivanushka@example.com",
                "contactId": "46d33121-602d-4ac0-94c0-21eff265dec5"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "20",
                "shipping": "3",
                "tax": "3",
                "discount": "1",
                "total": "15",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
                "address": {
                    "fullName": {
                        "firstName": "John",
                        "lastName": "Smith"
                    },
                    "country": "US",
                    "city": "New York",
                    "zipCode": "92544",
                    "phone": "+972 555234555",
                    "email": "Ivanushka@example.com"
                },
                "paidDate": "2023-11-09T17:49:15.240Z",
                "refundableByPaymentProvider": true
            },
            "shippingInfo": {
                "deliveryOption": "Express",
                "estimatedDeliveryTime": "Today",
                "shippingRegion": "Domestic",
                "shipmentDetails": {
                    "address": {
                        "fullName": {
                            "firstName": "John",
                            "lastName": "Smith"
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
                    "weight": "15.0",
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
            "discount": {
                "value": "1"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-09T17:49:15.969Z",
            "numericId": "10004",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "0cce7db9-5fe0-45ad-a0eb-bb71d05be5cb",
            "number": 10003,
            "dateCreated": "2023-11-09T04:56:17.413Z",
            "buyerInfo": {
                "id": "46d33121-602d-4ac0-94c0-21eff265dec5",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "Ivanushka@example.com",
                "contactId": "46d33121-602d-4ac0-94c0-21eff265dec5"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "10",
                "shipping": "3",
                "tax": "3",
                "discount": "1",
                "total": "15",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
                "address": {
                    "fullName": {
                        "firstName": "John",
                        "lastName": "Smith"
                    },
                    "country": "US",
                    "city": "New York",
                    "zipCode": "92544",
                    "phone": "+972 555234555",
                    "email": "Ivanushka@example.com"
                },
                "paidDate": "2023-11-09T04:56:17.512Z",
                "refundableByPaymentProvider": true
            },
            "shippingInfo": {
                "deliveryOption": "Express",
                "estimatedDeliveryTime": "Today",
                "shippingRegion": "Domestic",
                "shipmentDetails": {
                    "address": {
                        "fullName": {
                            "firstName": "John",
                            "lastName": "Smith"
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
                    "weight": "15.0",
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
                    "timestamp": "2023-11-09T04:56:17.413Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-09T04:56:17.512Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "1"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-09T04:56:17.949Z",
            "numericId": "10003",
            "refunds": [],
            "isInternalOrderCreate": false
        },
        {
            "id": "6dcca5f5-a86a-4612-810e-2f1effb45000",
            "number": 10002,
            "dateCreated": "2023-11-09T04:53:04.013Z",
            "buyerInfo": {
                "id": "46d33121-602d-4ac0-94c0-21eff265dec5",
                "type": "CONTACT",
                "identityType": "CONTACT",
                "firstName": "John",
                "lastName": "Smith",
                "phone": "+972 555234555",
                "email": "Ivanushka@example.com",
                "contactId": "46d33121-602d-4ac0-94c0-21eff265dec5"
            },
            "currency": "PHP",
            "weightUnit": "KG",
            "totals": {
                "subtotal": "10",
                "shipping": "3",
                "tax": "3",
                "discount": "1",
                "total": "15",
                "weight": "30",
                "quantity": 2
            },
            "billingInfo": {
                "paymentMethod": "PayPal",
                "externalTransactionId": "tx_1806",
                "paymentProviderTransactionId": "tx_1806",
                "paymentGatewayTransactionId": "tx_1806",
                "address": {
                    "fullName": {
                        "firstName": "John",
                        "lastName": "Smith"
                    },
                    "country": "US",
                    "city": "New York",
                    "zipCode": "92544",
                    "phone": "+972 555234555",
                    "email": "Ivanushka@example.com"
                },
                "paidDate": "2023-11-09T04:53:04.081Z",
                "refundableByPaymentProvider": true
            },
            "shippingInfo": {
                "deliveryOption": "Express",
                "estimatedDeliveryTime": "Today",
                "shippingRegion": "Domestic",
                "shipmentDetails": {
                    "address": {
                        "fullName": {
                            "firstName": "John",
                            "lastName": "Smith"
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
                    "weight": "15.0",
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
                    "timestamp": "2023-11-09T04:53:04.013Z"
                },
                {
                    "type": "ORDER_PAID",
                    "timestamp": "2023-11-09T04:53:04.081Z"
                }
            ],
            "fulfillments": [],
            "discount": {
                "value": "1"
            },
            "buyerLanguage": "en",
            "channelInfo": {
                "type": "WEB"
            },
            "enteredBy": {
                "id": "f9b675e1-1503-4b95-9472-33d68c1d446f",
                "identityType": "APP"
            },
            "lastUpdated": "2023-11-09T04:53:04.503Z",
            "numericId": "10002",
            "refunds": [],
            "isInternalOrderCreate": false
        }
    ],
    "metadata": {
        "items": 100,
        "offset": 0
    },
    "totalResults": 14
};
//# sourceMappingURL=sampleReturn.js.map