import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { 
    acceptFriendRequet, 
    getFriendRequest, 
    getMyFriends, 
    getRecomendedUser, 
    outGoingRequest, 
    sendFriendRequest } 
    from "../contollers/user.controller.js"

const userRouter = express.Router()
//it is used seperately so that every router can use it
userRouter.use(protectRoute)

userRouter.get("/",getRecomendedUser)
userRouter.get("/getFriend",getMyFriends)

userRouter.post("/friend-request/:id",sendFriendRequest);
userRouter.put("/friend-request-accept/:id/accept",acceptFriendRequet);
//TODO:we can add reject route as well here

userRouter.get("/friend-request",getFriendRequest);
userRouter.get("/outGoing-friend-request",outGoingRequest);//when user have sent the request then it must show that the friend request have sent like there should not a button which show" sent friend request"

export  default userRouter