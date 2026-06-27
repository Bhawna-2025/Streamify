import express from "express"
import "dotenv/config";
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "../src/routes/auth.route.js"
import userRoutes from "../src/routes/user.route.js"
import chatRouter from "./routes/chat.routes.js";

import { connectDB } from "./lib/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRouter)

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    const frontendDistPath = path.join(__dirname, "../../frontend/dist");
    app.use(express.static(frontendDistPath));
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendDistPath, "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectDB()
})
