import { PrismaClient, Prisma } from '@prisma/client'
import axios from "axios";
import { getIntegId,processInteg, getUserId } from "./integController"
import { RefreshToken } from "../auth";

const prisma = new PrismaClient()

export const getAllOrders = async(ctx) => {
  let userId:any
  if(ctx.get('maskedId') > 0) {
    userId = ctx.get('maskedId')
    userId = parseInt(userId);
  } else {
    userId = await getUserId(ctx)
  }

  const integId: any = await getIntegId(userId)
  // console.log(integId, '🚀 this is the integration ID')

  let index:any;
  try {
    index = await processInteg(integId)
  } catch(error:any) {
    console.error(error, "Error!")
  }
  console.log(index, '🚀 this is the index')

  const gsOrders = await prisma.orders.findMany({
    where: {
      user_id: userId,
      integration_id: integId,
      deleted_at: null
    }
  })
  // console.log(gsOrders, '🚀 this is the order')

  const gsOrigin = await prisma.origins.findFirst({
    where: {
      user_id: userId,
      is_default: true
    }
  })
  // console.log(gsOrigin, '🚀 this is the default origin of the user')

  //* id of the origin address
  const originId = gsOrigin?.id
  // console.log(originId, '🚀 this is the default origin id of the user')

  //* extracted from the gsOrigin
  const originJson:any = `{\"id\":${gsOrigin?.id},\"first_name\":\"${gsOrigin?.first_name}\",\"last_name\":\"${gsOrigin?.last_name}\",\"company\":\"${gsOrigin?.company}\",\"address\":\"${gsOrigin?.address}\",\"city\":\"${gsOrigin?.city}\",\"state\":\"${gsOrigin?.state}\",\"postal\":\"${gsOrigin?.postal}\",\"postal_origin\":\"${gsOrigin?.postal_origin}\",\"country\":\"${gsOrigin?.country}\",\"phone\":\"${gsOrigin?.phone}\",\"is_default\":1,\"timezone\":\"${gsOrigin?.timezone}\"}`;
  // console.log(originJson, '🚀 this is the default origin id of the user (json)')

  let gsOrderId:any = []
  let arrayShippings:any = []
  let arrayOrders:any = []
  let arrayOrderItems:any = []

  //* Getting order from the store
  //* Define the OAuth request parameters
  const refreshToken = await RefreshToken(integId);
  const QueryOrders = {
    'query': {
        'filter': `{
          "$and": [
            {
              "archived":false
            },
            {
              "fulfillmentStatus" : {"$ne" : "FULFILLED"}
            }
          ]
        }`,
        'paging': {
          'limit': 100,
        },
        'sort': '[{"number": "desc"}]'
      },
  }

  const orders:any = await axios.post('https://www.wixapis.com/stores/v2/orders/query', QueryOrders, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': refreshToken.data.access_token
        }
    })

  // console.log(orders?.data?.orders, 'orders')
  gsOrders.forEach(gsOrder => {
    if (gsOrder.id) gsOrderId.push(gsOrder.remote_id)
  })

  // console.log(gsOrderId, '🚀 gsOrderId')

  //* mapping the response json to the database
  orders?.data?.orders?.forEach((item:any) => {
    if(!(gsOrderId?.includes((item?.id)))) {
      const shippingData: any = {
        user_id: userId,
        first_name: item.shippingInfo.shipmentDetails.address.fullName.firstName,
        last_name: item.shippingInfo.shipmentDetails.address.fullName.lastName,
        company: item.shippingInfo.shipmentDetails.address?.company ?? null,
        address: item.shippingInfo.shipmentDetails.address?.addressLine1 ?? null,
        address2: item.shippingInfo.shipmentDetails.address?.addressLine2 ?? null,
        city: item.shippingInfo.shipmentDetails.address.city,
        province: item.shippingInfo.shipmentDetails.address.subdivision ?? null,
        postal_code: item.shippingInfo.shipmentDetails.address.zipCode,
        country: item.shippingInfo.shipmentDetails.address.country,
        phone: item.shippingInfo.shipmentDetails.address.phone,
        email: item.shippingInfo.shipmentDetails.address.email,
        created_at: new Date(),
        updated_at: new Date(),
      }
      const orderData: any = {
        parent_id: item.number,
        user_id: userId,
        integration_id: integId,
        marketplace_id: 21,
        remote_id: item.id,
        declared_value: item.totals.total,
        special_services: '',
        order_status_id: 1,
        description: item.billingInfo.paymentMethod,
        created_at: new Date(),
        updated_at: new Date(),
        order_number: item.numericId,
        weight_unit: item.weightUnit,
        total_weight: item.totals.weight
      }
      const lineItems = item.lineItems.map((item:any) => (
        {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          sku: item.sku,
          created_at: new Date(),
          updated_at: new Date()
        }
      ));
      arrayShippings.push(shippingData)
      arrayOrders.push(orderData)
      arrayOrderItems.push(lineItems)
    }
  })

  // console.log(arrayOrderItems, `this is the items ${arrayOrderItems.length}`)

  let gsShippingIds:any = []

  //* saving to the shipping_addresses table
  const createShippingAddress = arrayShippings.map(async (shipping:any) => {
    const createdShipping = await prisma.shipping_addresses.create({
      data: {
        user_id: shipping.user_id,
        first_name: shipping.first_name,
        last_name: shipping.last_name,
        company: shipping.company ?? null,
        address: shipping.address ?? null,
        address2: shipping.address2 ?? null,
        city: shipping.city,
        province: shipping.province?.split('-')[1] ?? null,
        postal_code: shipping.postal_code,
        country: shipping.country,
        phone: shipping.phone,
        email: shipping.email,
        marketplace_id: 21,
        created_at: new Date(),
        updated_at: new Date(),
      }
    })
    gsShippingIds.push(createdShipping.id)
    // console.log(createdShipping, '🚀 after createdShipping ')
  })

  // console.log(gsShippingIds, 'gsShipping Ids')
  await Promise.all(createShippingAddress)

  const shipping_service:any = await prisma.shipping_services.findFirst(
    {
        where: {
            code: 'UGA',
        },
    }
)
  let order_id:any = [];

  //* saving to the order table
  const createOrder = arrayOrders.map(async (order: any, index:number) => {
    order.weight_unit === "KG" ?  order.total_weight = (Math.ceil(Number(order.total_weight) * 35.27396)) : (Math.ceil(Number(order.total_weight) * 16))
    // console.log(order.total_weight, '🚀 weight is now in lb')
    const createdOrder = await prisma.orders.create({
      data: {
        user_id:order.user_id,
        integration_id:order.integration_id,
        marketplace_id:order.marketplace_id,
        shipping_address_id: gsShippingIds[index],
        remote_id:order.remote_id,
        declared_value:order.declared_value,
        package_type: 'PKG',
        shipping_service_id: shipping_service?.id,
        special_services: shipping_service?.special_services,
        future_shipping: false,
        order_status_id: 2,
        description:order.description,
        created_at: new Date(),
        updated_at: new Date(),
        parent_id:order.parent_id,
        is_parent: false,
        origin_json: originJson,
        order_number:order?.order_number,
        total_weight: order.total_weight
      }
    })
    await axios.get(`${process.env.WIX_PHP_SERVER_API}/rate-it/${createdOrder.id}`)
    order_id.push(createdOrder.id)
  })

  await Promise.all(createOrder)

  const createOrderItem = arrayOrderItems.map(async (item: any, index:number) => {
    item.map(async( list: any) => {
      await prisma.order_items.create({
      data: {
        order_id: order_id[index],
        name: list.name,
        price: list.price,
        quantity: list.quantity,
        created_at: list.created_at,
        updated_at: list.updated_at,
        sku: list.sku
      }
    })
    })
  })

  await Promise.all(createOrderItem)

  /**
   * testing for fulfillment
  */

  // const order_items:any = await prisma.order_items.findMany({
  //   where: {
  //     order_id : 6080
  //   }
  // })

  // console.log(order_items, 'order items')

  // // order_items.forEach((item:any) => console.log(item.quantity, 'items'))
  // const lineItems = order_items.map((item:any, index:any) => ({
  //   index: index + 1,
  //   quantity: item.quantity
  // }))

  // const order_label = await prisma.order_labels.findFirst({
  //   where: {
  //     order_id: 6073
  //   }
  // })

  // console.log(lineItems, 'line items')
  // // console.log(order_label?.tracking_id, 'order label')

  // console.log(
  //   `{
  //     "fulfillment": {
  //       "lineItems": ${JSON.stringify(lineItems)},
  //       "trackingInfo": {
  //         "shippingProvider": "usps",
  //         "trackingNumber": "${order_label?.tracking_id}",
  //         "trackingLink": "https://tools.usps.com/go/TrackConfirmAction?tLabels=${order_label?.tracking_id}"
  //       }
  //     }
  //   }`
  // )

  /**
   * testing for fulfillment
  */

  const allOrders = await syncOrders(ctx)
  ctx.status = 200;
  return ctx.body = [index, allOrders]
}

export const syncOrders = async(ctx:any) => {
  let userId:any

  if(ctx.get('masked') > 0) {
    userId = parseInt(ctx.get('maskedId'))
  } else {
    userId = await getUserId(ctx)
  }

  const integId: any = await getIntegId(userId)
  console.log(integId, '🚀 this is the integration ID')

  const gsOrders = await prisma.orders.findMany({
    where: {
      user_id: userId,
      integration_id: integId
    }
  })

  return gsOrders
}

export const fulfilOrder = async(ctx: any) => {
  console.log("FULFILLMENT CALLED")
  try {
    const orderId = ctx.request.body.order_id

    const order:any = await prisma.orders.findFirst({
      where: {
        id: orderId
      }
    })

    const order_label:any = await prisma.order_labels.findFirst({
      where: {
        order_id: orderId
      }
    })

    const integId = await getIntegId(order.user_id)

    const order_items = await prisma.order_items.findMany({
      where: {
        order_id : orderId
      }
    })

    const lineItems = order_items.map((item, index) => ({
      index: index + 1,
      quantity: item.quantity
    }))

    const refreshToken = await RefreshToken(integId)
    const CreateFulfillment = {
      "fulfillment" : {
        "lineItems" : lineItems,
        "trackingInfo" : {
          "shippingProvider" : "usps",
          "trackingNumber" : order_label?.tracking_id,
          "trackingLink" : `https://tools.usps.com/go/TrackConfirmAction?tLabels=${order_label?.tracking_id}`
        }
      }
    }

    const fulfillment:any = await axios.post(`https://www.wixapis.com/stores/v2/orders/${order?.remote_id}/fulfillments`, CreateFulfillment, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': refreshToken.data.access_token
      }
    })

    return fulfillment

  } catch (error:any) {
    console.log(error, 'Error')
  }
}

export const deleteOrder = async(ctx: any) => {
  console.log("DELETE ORDERS CALLED")
  let userId:any
  if(ctx.get('maskedId') > 0) {
    userId = parseInt(ctx.get('maskedId'))
  }
  else {
    userId = await getUserId(ctx)
  }

  const orderId = ctx.params.id
  try{
    const deleteUser = await prisma.orders.delete({
      where: {
        id: orderId,

      }
    })
    return orderId
  }catch(error:any) {
    ctx.body = error
    ctx.status = 400
    return ctx
  }
}