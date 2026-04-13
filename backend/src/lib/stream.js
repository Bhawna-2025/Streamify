import {StreamChat} from "stream-chat" 
import "dotenv/config"

const apiKey = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if(!apiKey||!apiSecret){
    console.errpr("Stream API key or Secret is missing")
}

const streamClient = StreamChat.getInstance(apiKey,apiSecret)

export const upsertStreamUser = async (userData) => {
    try{
        await streamClient.upsertUsers([userData]);//it will create and if it is already present then it only update 
        return userData

    }catch(err){
        console.error("Error upstering Stream user: ",err);
    }
}

//to do later
export const generateStremToken = async (userId)=>{}