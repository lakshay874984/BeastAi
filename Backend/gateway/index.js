import dotenv from "dotenv"
import express from "express"
import proxy from "express-http-proxy"
import cookieParser from "cookie-parser"
import cors from "cors"



dotenv.config()


const port  = process.env.port

const app =  express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

app.use("/auth",proxy(process.env.AUTH_URL))

app.get("/",(req,res) =>{
    res.json({"message":"Hey the server is running"})
})
 app.listen(port,()=>{
    console.log("Gateway Started",port)
 })
