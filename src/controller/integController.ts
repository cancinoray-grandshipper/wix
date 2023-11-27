import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Load environment variables from the .env file
dotenv.config();

export async function getUserId(ctx:any) {
  const xtoken:any = ctx.get('x-auth-token')
  const decoded = jwt.verify(xtoken, process.env.JWT_KEY as string)
  const decodedString = JSON.stringify(decoded)
  const decodedParse = JSON.parse(decodedString)

  return decodedParse.id
}

export async function getIntegId(id:any) {
  const integ = await prisma.integrations.findFirst({
    //* marketplace code for wix is 21
      where: {
          user_id: id,
          marketplace_id: 21
      }
  })
  if(integ !== null) {
      return integ.id
  }
  else {
      return null
  }
  
}

export async function processInteg(integId:any) {
  try {
    const updateIntegration = await prisma.integrations.update({
      where: {
        id: integId
      }, 
      data: {
        last_synced_at: new Date()
      }
    })
    return updateIntegration
  } catch(error: any) {
    console.error(error, "Error!")
  }
}

export async function saveInteg(ctx, name, nickname='', maskedId) {
  let userId
  if(maskedId > 0) {
    userId = maskedId
  } else {
    userId = await getUserId(ctx)
  }


  const integ = await prisma.integrations.findMany({
    where: {
        user_id: userId,
        marketplace_id: 21,
    }
})

console.log(integ, '🚀 this is the list of integ')

}

export async function updateInteg(ctx:any) {
  const body = ctx.request.body
  const id = body["id"]
  const name = body["name"]
  const nickname = body["nickname"]
  const active = body["active"]

    try {
      const updatedInteg = await prisma.integrations.update({
        where: {
          id: id
        },
        data: {
          name,
          nickname,
          active
        }
      })

      ctx.status = 200
      return updatedInteg
    }catch (error: any) {
      console.error(error, "Error!")
      ctx.status = 400;
      return ctx.body = error
    }
}

export async function deleteIntegration(ctx) {
  const userId = await getUserId(ctx)
  const integrationId: number = +ctx.params.id

  try {
    await prisma.orders.deleteMany({
      where: {
        integration_id: integrationId
      }
    })

    await prisma.integration_settings.deleteMany({
      where: {
        integration_id: integrationId
      }
    })

    const deleteInteg = await prisma.integrations.deleteMany({
      where: {
        id: integrationId
      }
    })
  } catch (error: any) {
    ctx.body = error
    ctx.status = 400
    return ctx
  }
}