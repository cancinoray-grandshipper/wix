// import { PrismaClient } from "@prisma/client";

// declare global {
//     var prisma: PrismaClient | undefined;
// };

// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db

import { PrismaClient } from '@prisma/client'

export default function (app) {
  const prisma = new PrismaClient()

  app.use(async (ctx, next) => {
    ctx.prisma = prisma
    await next()
    await ctx.prisma.$disconnect()
  })
}