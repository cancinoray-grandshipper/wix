import Router from "koa-router";
import axios from "axios";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { RefreshToken, getAppInstance } from "../auth";
import { CreateOrder, CreateAnotherOrder, QueryOrders, MyFolder } from "../files";
import { getAllOrders} from "../controller/wixController";
import { getAccessTokensFromWix, getAccessToken } from "../auth";
import { deleteIntegration, saveInteg, updateInteg } from "../controller/integController";
// interface RefreshTokenRequestBody {
//     refresh_token: string;
// }

// Load environment variables from the .env file
dotenv.config();

const incomingWebhooks: any =  [];

const router = new Router();

router.get("/", async(ctx) => {
  ctx.body = "Wix!"
})

router.get("/ping", async (ctx) => {
  try {
    ctx.body = {
      status: "success",
      data: "pong",
      market: "Wix"
    };
  } catch (error) {
    console.log(error, "error");
  }
});



router.post("/using-token", async (ctx) => {
  try {
    // Define the OAuth request parameters
    const refreshToken = await RefreshToken();

    // Handle the API response here
    // ctx.status = refreshToken.status;
    // ctx.body = refreshToken.data;
    ctx.body = {
      access_token: refreshToken.data.access_token,
    };
  } catch (error: any) {
    console.error("Error:", error);
    console.error(
      "Response Data:",
      error.response ? error.response.data : "No response data"
    );
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
});

router.post("/orders", async (ctx) => {
  try {
    const refreshToken = await RefreshToken();


    const order = await axios.post('https://www.wixapis.com/stores/v2/orders', CreateOrder, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': refreshToken.data.access_token
        }
    })

    ctx.body = {
        body_response: order.data
    }
    ctx.status = order.status
  } catch (error: any) {
    console.error("Error:", error);
    console.error(
      "Response Data:",
      error.response ? error.response.data : "No response data"
    );
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
});

router.post("/orders-all", async (ctx) => {
  try {
    const refreshToken = await RefreshToken();


    const order = await axios.post('https://www.wixapis.com/stores/v2/orders/query', QueryOrders, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': refreshToken.data.access_token
        }
    })

    ctx.body = {
        order_response: order.data
    }
    ctx.status = order.status
  } catch (error: any) {
    console.error("Error:", error);
    console.error(
      "Response Data:",
      error.response ? error.response.data : "No response data"
    );
    ctx.status = 500;
    ctx.body = "Internal Server Error";
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

//* saving the store
router.post('/ecomm/wix/integ/save', async(ctx, next) => {
  try {
    const body:any = ctx.request.body;
    const name = body.name
    const id = body.maskedId
    const nickName = body.nickName ?? ''
    console.log(body, 'this is the body in the ctx.request')

    // Redirect to the specified link
    ctx.redirect('https://www.wix.com/market?appMarketParams=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoie1wicm91dGVcIjpcInNoYXJlQXBwXCIsXCJhcHBEZWZJZFwiOlwiZjliNjc1ZTEtMTUwMy00Yjk1LTk0NzItMzNkNjhjMWQ0NDZmXCIsXCJzaGFyZUlkXCI6XCI1MTFiMzc0MS1lYTJjLTQyMmEtYTIxYS0xZDQxYjMyMjZjMDJcIixcInZlcnNpb25cIjpcImxhdGVzdFwifSIsImlhdCI6MTcwMTA2OTUyMX0.vumeq_MgagRyoJ2QKnclqAujhZXtl5uNq_eN-JF9FMU');

    const saveIntegCheck = await saveInteg(ctx, name, nickName, id)
  }catch (error:any) {
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


router.get('/signup', async (ctx) => {
  // This route is called before the user is asked to provide consent
  // Configure the `Redirect URL` in Wix Developers to point here
  // *** PUT YOUR SIGNUP CODE HERE *** ///
  console.log("got a call from Wix for signup");
  console.log("==============================");

  const permissionRequestUrl = 'https://www.wix.com/installer/install';
  const appId = process.env.CLIENT_ID; // Make sure to define APP_ID
  const redirectUrl = `https://${ctx.request.header.host}/login`;
  const token = ctx.query.token;
  const url = `${permissionRequestUrl}?token=${token}&appId=${appId}&redirectUrl=${redirectUrl}`;

  console.log("redirecting to " + url);
  console.log("=============================");

  ctx.redirect(url);
});

router.get('/login', async (ctx) => {
  try {
    // This route is called once the user finishes installing your application, and Wix redirects them to your application's site.
    // Configure the `App URL` in the Wix Developers to point here
    // *** PUT YOUR LOGIN CODE HERE *** ///
    console.log("got a call from Wix for login");
    console.log("=============================");

    const authorizationCode = ctx.query.code;

    console.log(`authorizationCode = ${authorizationCode}`);

    // Getting Tokens From Wix
    console.log("getting Tokens From Wix ");
    console.log("=======================");
    const data:any = await getAccessTokensFromWix(authorizationCode);

    const refreshToken = data.data.refresh_token;
    const accessToken = data.data.access_token;

    // console.log("refreshToken = " + refreshToken);
    console.log(`🚀🚀🚀refreshToken 🚀🚀🚀${refreshToken}`);
    console.log("=============================");
    console.log(`🚀🚀🚀accessToken 🚀🚀🚀${accessToken}`);
    console.log("=============================");

    const {instance: {instanceId}} = await getAppInstance(refreshToken);

    console.log("api call to instance returned: ");
    // console.log(instance);
    console.log(instanceId)

    // TODO: Save the instanceId and tokens for future API calls
    // console.log("=============================");
    // console.log(`User's site instanceId: ${instance.instance.instanceId}`);
    // console.log("=============================");

    // Render the login view
    // await ctx.render('login', {
    //   title: 'Wix Application',
    //   token: refreshToken,
    // });
  } catch (wixError) {
    console.log("Error getting token from Wix");
    console.log({ wixError });
    ctx.status = 500;
  }
});

router.post('/webhook-callback', async (ctx:any) => {
  const publicKey = process.env.PUBLIC_KEY

  if (!publicKey) {
    throw new Error('Public key is not defined in the environment variables')
  }
  try {
    console.log('got webhook event from Wix!', ctx.request.body);
    console.log('===========================');

    // Assuming ctx.request.body is the payload received
    const data:any = jwt.verify(ctx.request.body, publicKey as string);

    const parsedData = JSON.parse(data.data);
    const prettyData = { ...data, data: { ...parsedData, data: JSON.parse(parsedData.data) } };

    console.log('webhook event data after verification:', prettyData);
    incomingWebhooks.push({ body: prettyData, headers: ctx.headers });

    ctx.body = ctx.request.body;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
    console.error('Error processing webhook:', error);
  }
});


export default router;
