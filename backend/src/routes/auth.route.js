import express from "express"
import { signUp , logout , login } from "../contollers/auth.controller.js"

const router = express.Router()

router.post("/signUp",signUp)
router.post("/login",login)
router.post("/logout",logout)

export default router