import express from "express"
import { agent } from "../controllers/agent.controller.js"
import multer from "../config/multer.js"

const router=express.Router()

router.post("/chat",multer.single("file"),agent) // multer.single("file") is a middleware function provided by the multer library. It is used to handle file uploads in an Express.js application. When a client sends a POST request to the "/chat" endpoint with a file attached (with the field name "file"), this middleware processes the file upload and makes it available in the request object (req.file) for further handling in the agent controller,the req.file contains the uploaded file information for example, the file name, size, and type.

export default router