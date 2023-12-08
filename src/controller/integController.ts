import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Load environment variables from the .env file
dotenv.config();

export async function getUserId(ctx:any) {
  const xtoken:any = ctx.get('x-auth-token') || ctx.get('authorization')
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
          marketplace_id: 21,
          deleted_at: {equals: null}
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
          active,
          updated_at: new Date()
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

export async function deleteIntegration(ctx:any) {
  const userId = await getUserId(ctx)
  const integrationId: number = +ctx.params.id

  try {
    const deleteIntegSettings = await prisma.integration_settings.updateMany({
      where: {
          integration_id: integrationId
      },
      data: {
          deleted_at: new Date()
      }
    })
    const deleteInteg = await prisma.integrations.update({
        where: {
            id: integrationId
        },
        data: {
            deleted_at: new Date()
        }
    })
    ctx.status = 200
  } catch (error: any) {
    ctx.body = error
    ctx.status = 400
    return ctx
  }
}

export async function saveInteg(ctx:any, userId:any, refreshToken:any, instanceId:any, siteDisplayName:any) {
  try {
    // Check if instanceId already exists
    const existingSetting = await prisma.integration_settings.findFirst({
      where: {
        name: 'instanceId',
        value: instanceId,
        deleted_at: {equals: null}
      },
    });

    if (existingSetting) {
      // instanceId already exists, handle accordingly (e.g., throw an error or log a message)
      console.error('instanceId already exists in integration_settings');
      return;
    }

    const saveInteg = await prisma.integrations.create({
      data: {
        user_id: userId,
        marketplace_id: 21,
        name: siteDisplayName,
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })
    const saveIntegId = saveInteg.id
    console.log(saveIntegId, 'saveIntegId')

    await prisma.integration_settings.createMany({
      data: [
        {integration_id: saveIntegId, name: 'refreshToken', value:refreshToken, created_at: new Date(), updated_at: new Date()},
        {integration_id: saveIntegId, name: 'instanceId', value:instanceId, created_at: new Date(), updated_at: new Date()}
      ]
    })

    return saveIntegId
  } catch (error: any) {
    console.error("Error:", error);
    console.error(
      "Response Data:",
      error.response ? error.response.data : "No response data"
    );
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
}

export async function processDatabase (ctx: any) {
  console.log(ctx.header.authorization, 'ctx is here')
  const userID = await getUserId(ctx)
  const integrationId: number = +ctx.params.id

  try {
    await prisma.integrations.update({
      where: {
        id: integrationId
        },
        data: {
          user_id: userID
        },
      })
    ctx.status = 200
  } catch (error: any) {
    console.error("Error:", error);
    console.error(
      "Response Data:",
      error.response ? error.response.data : "No response data"
    );
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
}