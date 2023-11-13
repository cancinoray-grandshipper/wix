import axios from 'axios'
import dotenv from 'dotenv'

// Load environment variables from the .env file
dotenv.config();

export const RefreshToken = async() => {
    try {
        // Define the OAuth request parameters
        const oauthRequest = {
          grant_type: 'refresh_token',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          refresh_token: process.env.REFRESH_TOKEN
        };
    
        // Send the PUT request to the Wix OAuth Access API
        const response = await axios.post('https://www.wixapis.com/oauth/access', oauthRequest, {
          headers: { 'Content-Type': 'application/json' },
        });

        return response;
    } catch(error:any) {
        console.error
        console.error('Response Data:', error.response ? error.response.data : 'No response data');
    throw error;
    }
}