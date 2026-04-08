import express from "express"
import "dotenv/config";

import authRoutes from "../src/routes/auth.route.js"
import { connectDB } from "./lib/db.js";

const app =express()
const PORT = process.env.PORT ||4000

app.use(express.json())
app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDB()
})

