import express from "express"
import "dotenv/config";
import cookieParser from "cookie-parser"

import authRoutes from "../src/routes/auth.route.js"
import userRoutes from "../src/routes/user.route.js"

import { connectDB } from "./lib/db.js";


const app =express();
const PORT = process.env.PORT ||4000

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDB()
})

