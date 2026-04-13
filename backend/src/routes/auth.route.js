import express from "express"
import { signUp , logout , login,onboard } from "../contollers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signUp",signUp)
router.post("/login",login)
router.post("/logout",logout)

//TODO:forgot-password
//TODO:reset-password-send email for that

router.post("/onboarding", protectRoute, onboard)

//to check if user logged in or not
router.get("/me",protectRoute,(req,res)=>{
    return res.status(200).json({
        message:"user logged in",
        user:req.user
    })
})

export default router