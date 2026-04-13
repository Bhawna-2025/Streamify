import User from "../models/user.js";
import FriendRequest from "../models/friendRequest.js";

export async function getRecomendedUser(req,res){
    try{
        const currentUserId = req.user._id
        const currentUser = req.user

        const recomendedUser = await User.find({
            $and:[
                {_id:{$ne:currentUserId}},//it will exclude current logged in user
                {_id:{$nin:currentUser.friends}},//exclude current user's friends
                {isOnboarded:true}
            ]
        })

        res.status(200).json(recomendedUser)

    }catch(err){
        console.log("Error in recomendedUser controller: ",err.message)
        return res.status(500).json({message:"Internal server error"})

    }

}

export async function getMyFriends(req,res){
    try{
        const user = await User.findById(req.user._id)
        .select("friends") //it is used to select specific field and still after filtering it will return as object 
        .populate("friends","fullName profilePic nativeLanguage learningLanguage")//populate is used to replace the id with actual full data

         res.status(200).json(user.friends)//here we will get the actual data that we want that is array of friends

    }catch(err){
        console.error("error in getMyFriends: ",err);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function sendFriendRequest(req,res){
    try{
        const myId= req.user._id
        const {id:recipientId}= req.params //{friendId:recipient} is used to update the name of variable as it will be saved as recipient now
        if(myId==recipientId){
            return res.status(400).json({
                message:"you can't send freind request to yourself"
            })
        }

        const recipient = await User.findById(recipientId)
        if(!recipient){
            return res.status(401).json({
                message:"recipient do not exist"
            })
        }

        //check if this user already friend of you
        if(recipient.friends.includes(myId)){
            return res.status(400).json({
                message:"you are already friend of this user!"
            })
        }

        //check if the request already sent btw you and this user
        const existingRequest = await FriendRequest.findOne({
            $or:[
                {sender:myId,recipient:recipientId},
                {sender:recipientId,recipient:myId}
            ]
        })
        if(existingRequest){
            return res.status(400).json({
                message:"this request is already exist between you and this user"
            })
        }

        //creation of request
        const friendRequest = new FriendRequest.create({
            sender:myId,
            recipient:recipientId
        })
        return res.status(201).json({
            message:"Friend request sent sucessfully",
            friendRequest
        })


    }catch(err){
         console.error("error in sendFreindRequest: ",err);
        res.status(500).json({message:"Internal server error"});
    } 
}

export async function acceptFriendRequet(req,res){
    try{
        const {id:requestID} = req.params
        const friendRequest = await FriendRequest.findOne(requestID)

        if(!friendRequest){
            return res.status(404).json({
                message:"Friend request not found!"
            })
        }

        //verify the cuurent user is the recipient 
        if(friendRequest.recipient.toString()!==req.user._id){
            return res.status(404).json({
                message:"You are not authorized to accept this request!"
            })
        }

        friendRequest.status="accepted"
        await friendRequest.save()

        //adding each user to one another
        //$addToSet is a method to add an element to an array only if that is not present already
        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet:{friends:friendRequest.recipient}
        })

        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet:{friends:friendRequest.sender}
        })

        return res.status(200).json({
            message:"Friend request is accepted"
        })

    }catch(err){
        console.error("error in acceptFriendRequest controller: ",err);
        res.status(500).json({message:"Internal server error"});
    }
}

//for the notification page we have to create one more api request that is get friend request
export async function getFriendRequest(req,res){
    try {
        const incommingFriendRequest =await FriendRequest.find({
            recipient:req.user._id,
            status:"pending",
        }).populate("sender","fullName profilePic nativeLanguage learningLanguage,")

        const acceptedRequest = await FriendRequest.find({
            recipient:req.user._id,
            status:"accepted"
        }).populate("recipient","fullName profilePic")

        // if(!incommingRequest){
        //     return res.status(400).json({
        //         message:"There are no freind request found"
        //     })
        // }

        return res.status(200).json({incommingFriendRequest,acceptedRequest})
        
    } catch (error) {
        console.error("error in getFriendRequest controller: ",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function outGoingRequest(req,res){
    try {
         const outGoingFriendRequest =await FriendRequest.find({
            sender:req.user._id,
            status:"pending",
        }).populate("recipient","fullName profilePic nativeLanguage learningLanguage,")

        return res.status(200).json(outGoingFriendRequest)

    }catch(error) {
        console.error("error in outGoingRequest controller: ",error);
        res.status(500).json({message:"Internal server error"});
    }
}