// this is file is created to add the user in stream dashboard

import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/user.js"
import jwt from "jsonwebtoken";

export async function signUp(req, res) {

    //info fron body

    const { email, password, fullName } = req.body

    try {

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

        const isUserExist = await User.findOne({ email })

        if (isUserExist) {
            return res.status(400).json({
                message: "Email already exist , use another email!"
            })
        }

        //api from profile pic

        const idx = Math.floor(Math.random() * (300 - 200 + 1)) + 200//generate number between 1 and 1000
        const randomAvtar = `https://testingbot.com/free-online-tools/random-avatar/${idx}`

        //creating a new user

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvtar
        })

        //creating a user in stream as well -- for chat 
        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                fullName: newUser.fullName,
                image: newUser.profilePic || ""
            })
            console.log(`Stream user created for ${newUser.fullName}`)

        } catch (err) {
            console.log("Error creating stream user: ", err)

        }

        //token creation
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,//prevent XSS attacks,
            sameSite: "Strict",//prevent CSRF attacks
            secure: process.env.NODE_ENV == "production"
        })

        res.status(201).json({
            success: true,
            user: newUser
        })

    } catch (err) {
        console.log("Error in SignUp : " + err)
        res.status(500).json({
            message: "Internal server error"
        })
    }

}

export async function login(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).json({
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        const isPasswordCorrect = await user.matchPassword(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "wrong password"
            })
        }

         try {
            await upsertStreamUser({
                id: user._id.toString(),
                fullName: user.fullName,
                image: user.profilePic || ""
            })
            console.log(`Stream user created for ${user.fullName}`)

        } catch (err) {
            console.log("Error creating stream user: ", err)

        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,//prevent XSS attacks,
            sameSite: "Strict",//prevent CSRF attacks
            secure: process.env.NODE_ENV == "production"
        })
        res.status(201).json({
            success: true,
            user
        })


    } catch (err) {
        console.log("Error in SignUp : " + err)
        res.status(500).json({
            message: "Internal server error"
        })
    }

}


export function logout(req, res) {
    res.clearCookie("jwt")
    res.status(200).json({
        success: true,
        message: "User LoggedOut successfully"
    })
}

//this function is to update the user on onboading page 
export async function onboard(req, res) {
    try {
        const userId = req.user._id;

        const { fullname, bio, nativeLanguage, learningLanguage, location } = req.body
        if (!fullname || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required!!",
                missingField: [
                    !fullname && "fullname",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean),

            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true
        }, { new: true })

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        //TODO:UPDATE THE USER IN STREAM

        try {
            await upsertStreamUser({
                id:updatedUser._id.toString(),
                fullname:updatedUser.fullName,
                profilePic:updatedUser.profilePic||""
            });
            console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`)

        } catch (streamError) {
            console.log("Stream Error : ", streamError)
            return res.status(500).json({
                message: "Internal server error"
            })
        }


        res.status(200).json({
            success: true,
            user: updatedUser
        })

    } catch (err) {
        console.log("Error in onborded function : ", err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}

