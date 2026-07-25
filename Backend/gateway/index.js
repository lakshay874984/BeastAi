import dotenv from "dotenv"
import express from "express"
import proxy from "express-http-proxy"
import cookieParser from "cookie-parser"
import cors from "cors"
import protect from "./middleware/auth.middleware.js"
import { getCurrentUser } from "./controllers/user.controller.js"
import { proxyWithHeader } from "./utils/proxyWithHeader.js"




dotenv.config()


const port  = process.env.port

const app =  express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

app.use("/api/auth",proxy(process.env.AUTH_URL))
app.use("/api/chat",proxyWithHeader(process.env.CHAT_URL))
app.get("/api/me",protect,getCurrentUser)

app.get("/",(req,res) =>{
    res.json({"message":"Hey the server is running"})
})
 app.listen(port,()=>{
    console.log("Gateway Started",port)
 })
