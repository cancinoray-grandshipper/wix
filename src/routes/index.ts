import Router from "koa-router";
import axios from "axios";
import { RefreshToken } from "../auth";
import { CreateOrder, CreateAnotherOrder, QueryOrders } from "../files";
import { getAllOrders } from "../controller/wixController";
import { prismaExperiment } from "../controller/integController";

// interface RefreshTokenRequestBody {
//     refresh_token: string;
// }

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
    const refreshToken = await RefreshToken();
    const order = await getAllOrders(refreshToken)

    ctx.body = {
        order_response: order.data
        // prisma: prismaExperiment()
    }
    ctx.status = order.status

    // console.log(prismaExperiment(), 'prisma experiment')

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


export default router;
