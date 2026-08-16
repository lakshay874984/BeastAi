import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import router from "./routes/agent.route.js"
dotenv.config()

const port =process.env.PORT

const app=express()

app.use(express.json())
app.use("/",router)

app.use((err,req,res,next)=>{ // it is a middleware function that will catch any error that is thrown in the application and it will return the error message to the client in json format with the status code of the error if the error has a status code otherwise it will return a 500 status code with the error message
  console.log(err)

  if(err.status){ // this is for the rate limit error that we are throwing in the checkAgentLimit function in the agentLimit.js file and we are checking if the error has a status code then we will return the error message to the client in json format with the status code of the error
    return res.status(err.status).json(err.data)
  }

  return res.status(500).json({message:`agent error ${err}`})
})


app.get("/",(req,res)=>{
    res.json({message:"hello from agent"})
})

app.listen(port,()=>{
    console.log(`agent started at ${port}`)
    connectDb()
})
