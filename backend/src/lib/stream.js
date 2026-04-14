import { StreamChat } from "stream-chat"
import "dotenv/config"

const apiKey = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if (!apiKey || !apiSecret) {
    console.errpr("Stream API key or Secret is missing")
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret)
//Stream chat - It is the main class which is used to connect my app to stream's chat database and it comes from Stream SDK.
//getInstance - It is a method which create an object for this class , and it only create that object once and do not change it .
export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);//it will create and if it is already present then it only update 
        return userData

    } catch (err) {
        console.error("Error upstering Stream user: ", err);
    }
}

//generating token for stream then using this function in chat controller 
export const generateStreamToken = async (userId) => {
    try {
        //ensure userId is a string 
        const userIdStr = userId.toString()
        return streamClient.createToken(userIdStr)
    } catch (error) {
        console.log("Error in generating token in stream  : ", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}