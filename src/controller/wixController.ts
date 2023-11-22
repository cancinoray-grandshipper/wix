import { PrismaClient, Prisma } from '@prisma/client'
import axios from "axios";
import { getIntegId,processInteg } from "./integController"

const prisma = new PrismaClient()

// const originJson = `{
//   "id": ${gsOrigin.id},
//   "first_name": "${gsOrigin.first_name}",
//   "last_name": "${gsOrigin.last_name}",
//   "company": "${gsOrigin.company}",
//   "address": "${gsOrigin.address}",
//   "city": "${gsOrigin.city}",
//   "state": "${gsOrigin.state}",
//   "postal": "${gsOrigin.postal}",
//   "postal_origin": "${gsOrigin.postal_origin}",
//   "country": "${gsOrigin.country}",
//   "phone": "${gsOrigin.phone}",
//   "is_default": 1,
//   "timezone": "${gsOrigin.timezone}"
// }`;

// export const getOrders = async(ctx) =>  {
//   let userId;

//   if(ctx.get('maskedId') > 0) {
//     userId = parseInt(ctx.get('maskedId'))
//   }

//   console.log(userId, 'userId')

// }

export const getAllOrders = async(refreshToken:any) => {
  let userId:any= 3

  const integId: any = await getIntegId(userId)
  console.log(integId, '🚀 this is the integration ID')

  let index:any;
  try {
    index = await processInteg(integId)
  } catch(error:any) {
    console.error(error, "Error!")
  }
  console.log(index, '🚀 this is the index')

  // ? It should be separated. we just want to get the credential to get the access_token
  // const wixClientId = await prisma?.integration_settings.findFirst({
  //   where: {
  //     integration_id: integId,
  //     name: "wixClientId"
  //   }
  // })
  // console.log(wixClientId, 'this is the wix client id!')

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
  console.log(gsOrigin, '🚀 this is the default origin of the user')

  //* id of the origin address
  const originId = gsOrigin?.id
  console.log(originId, '🚀 this is the default origin id of the user')

  //* extracted from the gsOrigin
  const originJson = `{
    "id": ${gsOrigin?.id},
    "first_name": "${gsOrigin?.first_name}",
    "last_name": "${gsOrigin?.last_name}",
    "company": "${gsOrigin?.company}",
    "address": "${gsOrigin?.address}",
    "city": "${gsOrigin?.city}",
    "state": "${gsOrigin?.state}",
    "postal": "${gsOrigin?.postal}",
    "postal_origin": "${gsOrigin?.postal_origin}",
    "country": "${gsOrigin?.country}",
    "phone": "${gsOrigin?.phone}",
    "is_default": 1,
    "timezone": "${gsOrigin?.timezone}"
  }`;
  console.log(originJson, '🚀 this is the default origin id of the user (json)')

  let gsOrderId:any = []
  let arrayShippings:any = []
  let arrayOrders:any = []

  const QueryOrders = {
    'query': {
        'filter': '{"paymentStatus":"PAID"}',
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

    // if(gsOrders.length == 0) {
    //   console.log(orders.data.orders[0], '🚀 pulled order in the wix store')
    // }

    gsOrders.forEach(gsOrder => {
      if (gsOrder.id) gsOrderId.push(gsOrder.remote_id)
    })

  console.log(gsOrderId, '🚀 gsOrderId')

    //mapping the response json to the shipping_addresses column
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
          total_price: item.totals.total,
          special_services: '',
          order_status_id: 1,
          description: item.billingInfo.paymentMethod,
          created_at: new Date(),
          updated_at: new Date(),
          order_number: item.numericId,
          weight_unit: item.weightUnit,
          total_weight: item.totals.weight
        }
        arrayShippings.push(shippingData)
        arrayOrders.push(orderData)
      }
    })

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
          province: shipping.province ?? null,
          postal_code: shipping.postal_code,
          country: shipping.country,
          phone: shipping.phone,
          email: shipping.email,
          marketplace_id: 22,
          created_at: new Date(),
          updated_at: new Date(),
        }
      })
      gsShippingIds.push(createdShipping.id)
      // console.log(createdShipping, '🚀 after createdShipping ')
    })

    console.log(gsShippingIds, 'gsShipping Ids')
    await Promise.all(createShippingAddress)

    const shipping_service:any = await prisma.shipping_services.findFirst(
      {
          where: {
              code: 'UGA',
          },
      }
  )

    //* saving to the order table
    const createOrder = arrayOrders.map(async (order: any, index:number) => {
      order.weight_unit == "LB" ? order.weight_unit : Math.floor(order.total_weight * 2.20462)
      console.log(order.total_weight, '🚀 weight is now in lb')
      await prisma.orders.create({
        data: {
          user_id:order.user_id,
          integration_id:order.integration_id,
          marketplace_id:order.marketplace_id,
          shipping_address_id: gsShippingIds[index],
          remote_id:order.remote_id,
          total_price:order.total_price,
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
          origin_json: JSON.parse(originJson),
          order_number:order?.order_number,
          total_weight: order.total_weight
        }
      })
    })



    await Promise.all(createOrder)

    //* the return is in the form of {orders: [{id...}]}
    // console.log(getOrder.data.orders[0], 'getting order')
    return orders;
}