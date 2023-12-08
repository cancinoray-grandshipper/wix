import { PrismaClient, Prisma } from '@prisma/client'
import axios from 'axios'
import dotenv from 'dotenv'
import { getUserId } from '../controller/integController';

// Load environment variables from the .env file
dotenv.config();

const prisma = new PrismaClient()


const AUTH_PROVIDER_BASE_URL = 'https://www.wixapis.com/oauth';
const INSTANCE_API_URL = 'https://www.wixapis.com/apps/v1'

export const RefreshToken = async(integId:any) => {
  // console.log(integId, 'in refresh token')
  const integrationSetting = await prisma.integration_settings.findFirst({
    where: {
      integration_id: integId,
      name: 'refreshToken'
    }
  })

  // console.log(integrationSetting?.value, 'this is the integration setting value')

  try {
      // Define the OAuth request parameters
      const oauthRequest = {
        grant_type: 'refresh_token',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: integrationSetting?.value
      };
  
      // Send the PUT request to the Wix OAuth Access API
      const response = await axios.post(`${AUTH_PROVIDER_BASE_URL}/access`, oauthRequest, {
        headers: { 'Content-Type': 'application/json' },
      });

      return response;
  } catch(error:any) {
      console.error
      console.error('Response Data:', error.response ? error.response.data : 'No response data');
  throw error;
  }
}

export const getAccessTokensFromWix = async (authCode:any) => {
  try {
    const response = axios.post(`${AUTH_PROVIDER_BASE_URL}/access`, {
      code: authCode,
      client_secret: process.env.CLIENT_SECRET,
      client_id: process.env.CLIENT_ID,
      grant_type: 'authorization_code'
    })
    // console.log(response, 'response!')
    return response;
  } catch(error: any) {
    console.error
    console.error('Response Data:', error.response ? error.response.data : 'No response data');
  }
}

export const getAccessToken = async (refreshToken: any) => {
  try {
    const response = axios.post(`${AUTH_PROVIDER_BASE_URL}/access`, {
      refresh_token: refreshToken,
      client_secret: process.env.CLIENT_SECRET,
      client_id: process.env.CLIENT_ID,
      grant_type: 'refresh_token'
    })
    return response;
  } catch(error: any) {
    console.error
    console.error('Response Data:', error.response ? error.response.data : 'No response data');
  }
}

export const getAppInstance = async(refreshToken:any) => {
  try {
    console.log(`getAppInstance with refreshToken = ${refreshToken}`);
    console.log("==============================");
    const response:any = await getAccessToken(refreshToken);
    console.log(response.data.access_token, 'is there an access token here?')
    const access_token = response.data.access_token

    console.log(`accessToken = ${access_token}`);

    const body = {
      // *** PUT YOUR PARAMS HERE ***
      //query: {limit: 10},
    };
    const options = {
      headers: {
        authorization: access_token,
      },
    };
    const appInstance = axios.create({
      baseURL: INSTANCE_API_URL,
      headers: {authorization: access_token}
    });
    const instance = (await appInstance.get('instance', body)).data;

    return instance;
  } catch (e) {
    console.log('error in getAppInstance');
    console.log({e});
    return;
  }
};
