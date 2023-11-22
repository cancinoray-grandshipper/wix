import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

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

export const prismaExperiment = async() => {
  const data = await prisma.origins.findMany()
  console.log(data, 'prisma data integ')
  return data
}

