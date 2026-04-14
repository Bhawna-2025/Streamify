import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getStreamToken } from "../contollers/chat.controller.js"

const chatRouter =express.Router()

chatRouter.get("/chat",protectRoute,getStreamToken)

export default chatRouter