import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db.js"
import router from "./router/auth.route.js"
import cors from "cors"



dotenv.config()

const port  = process.env.PORT

const app =  express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use("/",router)
app.get("/",(req,res) =>{
    res.json({"message":"Auth Services Started"})
})
app.listen(port, async () => {
    console.log("Auth Service Started", port)
    await connectDB()
})
