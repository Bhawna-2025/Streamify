import User from "../models/user.js"
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
    const { email, password, fullName } = req.body //info fron body

    try{

        //check validators

        if (!email || !password || !fullName) {
            return res.status(400).json({
                message: "All fields are required!"
            })
        }
    
        if (password < 6) {
            return res.status(400).json({
                message: "Password should be atleast 6 characters!"
            })
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
    
        const isUserExist = await User.findOne({email})
    
        if(isUserExist){
            return res.status(400).json({
                message:"Email already exist , use another email!"
            })
        }

        //api from profile pic

        const idx =Math.floor(Math.random() * (300 - 200 + 1)) + 200//generate number between 1 and 1000
        const randomAvtar=`https://testingbot.com/free-online-tools/random-avatar/${idx}`
        
        //creating a new user

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic:randomAvtar,
        })

        //token creation
        const token =jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })

         res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,//prevent XSS attacks,
            sameSite:"Strict",//prevent CSRF attacks
            secure:process.env.NODE_ENV=="production"
        })

        res.status(201).json({
            success:true,
            user:newUser
        })

    }catch(err){
        console.log("Error in SignUp : " + err)
        res.status(500).json({
            message:"Internal server error"
        })
    }

}






export async function login(req, res) {
    res.send("login")
}
export function logout(req, res) {
    res.send("logout")
}