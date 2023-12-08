import cors from 'koa2-cors';
import { PrismaClient, Prisma } from '@prisma/client'
import Router from "koa-router";
import axios from "axios";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { RefreshToken, getAppInstance } from "../auth";
import { deleteOrder, fulfilOrder, getAllOrders} from "../controller/wixController";
import { getAccessTokensFromWix, getAccessToken } from "../auth";
import { deleteIntegration, processDatabase, saveInteg, updateInteg } from "../controller/integController";


// Load environment variables from the .env file
dotenv.config();
const prisma = new PrismaClient()

const incomingWebhooks: any =  [];

const router = new Router();

router.get("/", async(ctx) => {
  ctx.body = "Wix!"
})

//* testing
router.get("/ping", async (ctx) => {
  try {
    ctx.body = {
      status: "success",
      data: "pong",
      market: "Wix"
    };

    console.log(ctx, '🚀 this is the received ctx')
  } catch (error) {
    console.log(error, "error");
  }
});

router.get('/ecomm/wix/orders/get', async (ctx) => {
  try {

    await getAllOrders(ctx)

  } catch (error: any) {
    console.error("Error:", error);
    console.error(
      "Response Data:",
      error.response ? error.response.data : "No response data"
    );
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
})

router.put('/ecomm/wix/integ/update', async (ctx) => {
  try {

    await updateInteg(ctx)

  } catch(error: any) {
    console.error("Error:", error);
    console.error(
      "Response Data:",
      error.response ? error.response.data : "No response data"
    );
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
})

router.delete('/ecomm/wix/order/delete/:id', async(ctx) => {
  try {

    await deleteOrder(ctx)

  } catch(error: any) {
    console.error("Error:", error);
    console.error(
      "Response Data:",
      error.response ? error.response.data : "No response data"
    );
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
})

router.delete('/ecomm/wix/integ/delete/:id', async (ctx) => {
  try {

    await deleteIntegration(ctx)

  } catch(error: any) {
    console.error("Error:", error);
    console.error(
      "Response Data:",
      error.response ? error.response.data : "No response data"
    );
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
})

router.put('/ecomm/wix/fulfillment', async (ctx) => {
  try {
    await fulfilOrder(ctx)
    ctx.body = {message: 'Order Completed!'}
  } catch (error: any) {
    console.error("Error:", error);
    console.error(
      "Response Data:",
      error.response ? error.response.data : "No response data"
    );
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
})


router.get('/signup', async (ctx) => {
  // This route is called before the user is asked to provide consent
  // Configure the `Redirect URL` in Wix Developers to point here
  const permissionRequestUrl = 'https://www.wix.com/installer/install';
  const appId = process.env.CLIENT_ID; // Make sure to define APP_ID
  const redirectUrl = `https://${ctx.request.header.host}/login`;
  const token = ctx.query.token;
  const url = `${permissionRequestUrl}?token=${token}&appId=${appId}&redirectUrl=${redirectUrl}`;

  ctx.redirect(url);
});

router.get('/login', async (ctx) => {
  try {
    // This route is called once the user finishes installing your application, and Wix redirects them to your application's site.
    // Configure the `App URL` in the Wix Developers to point here

    const authorizationCode = ctx.query.code;

    // Getting Tokens From Wix
    const data:any = await getAccessTokensFromWix(authorizationCode);
    const refreshToken = data.data.refresh_token;
    const accessToken = data.data.access_token;

    const {instance: {instanceId}, site: {siteDisplayName}} = await getAppInstance(refreshToken);

    // console.log(instance);
    // console.log('Instance ID:', instanceId);
    // console.log('Site Display Name:', siteDisplayName);

    // TODO: Save the instanceId and tokens for future API calls
    // TODO: I need to save the instanceID, siteDisplayName and refreshToken in the database

    //* temporarily saved the user store in user_id = 3
    const userId:any = 3
    // console.log(userId, 'before saveInteg')
    const integID = await saveInteg(ctx, userId, refreshToken, instanceId, siteDisplayName)
    console.log(integID, 'integID')

    ctx.status = 301
    //* after redirecting to the url, frontend will fireup to pass the auth token and extract the user_id of the user
    //* and called the route /ecomm/wix/process/:id
    ctx.redirect(`${process.env.REDIRECT_TO}?ecomm=wix&i=${integID}`)

  } catch (error:any) {
    console.error("Error:", error);
    console.error(
      "Response Data:",
      error.response ? error.response.data : "No response data"
    );
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
});

router.post('/webhook-callback', async (ctx:any) => {
  const publicKey = process.env.PUBLIC_KEY

  if (!publicKey) {
    throw new Error('Public key is not defined in the environment variables')
  }
  try {
    // Assuming ctx.request.body is the payload received
    const data:any = jwt.verify(ctx.request.body, publicKey as string);

    const parsedData = JSON.parse(data.data);
    const prettyData = { ...data, data: { ...parsedData, data: JSON.parse(parsedData.data) } };

    // console.log('webhook event data after verification:', prettyData);
    incomingWebhooks.push({ body: prettyData, headers: ctx.headers });

    ctx.body = ctx.request.body;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
    console.error('Error processing webhook:', error);
  }
});

router.patch('/ecomm/wix/process/:id', async(ctx) => {
  try {
    await processDatabase(ctx)
  } catch (error:any) {
    console.error("Error:", error);
    console.error(
      "Response Data:",
      error.response ? error.response.data : "No response data"
    );
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
})


export default router;
