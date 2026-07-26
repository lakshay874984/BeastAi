import dotenv from "dotenv"
import express from "express"

import { connectDB } from "./config/db.js"
import router from "./routes/chat.routes.js"




dotenv.config()

const port  = process.env.PORT

const app =  express()
app.use(express.json())
app.use("/",router)

app.get("/",(req,res) =>{
    res.json({"message":"Chat Services Started"})
})
 app.listen(port,()=>{
    console.log("Chat Started",port)
    connectDB()
 })
