import dotenv from "dotenv"
import express from "express"



dotenv.config()


const port  = process.env.port

const app =  express()
app.use(express.json())



app.get("/",(req,res) =>{
    res.json({"message":"Hey the server is running"})
})
 app.listen(port,()=>{
    console.log("Gateway Started",port)
 })
