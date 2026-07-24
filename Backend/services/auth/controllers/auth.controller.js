import { randomUUID } from "crypto"
import { getAuth } from "firebase-admin/auth"
import { app } from "../config/firebase.js"
import User from "../models/user.model.js"
import redis from "../../../shared/redis.js";

export const login = async (req, res) => {
    try {
        // console.log("BODY:", req.body);

        const { token } = req.body;
        
        // console.log("TOKEN:", token);

        const decoded = await getAuth(app).verifyIdToken(token);
        // console.log("DECODED:", decoded);

        let user = await User.findOne({ firebaseUid: decoded.uid });
        // console.log("USER:", user);

        if (!user) {
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture
            });
        }
        const sessionId =  crypto.randomUUID()

        await redis.set(`session-${sessionId}`,JSON.stringify({
            userId:user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar
        }),"EX",7*24*60*60)

        res.cookie("session",sessionId,{
                httpOnly:true,
                secure:false,
                sameSite:"strict",
                maxAge:7*24*60*60*1000
        })

        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};


export const logout = async (req,res)=>{
    try{
        const sessionId = req.cookies?.session

        await redis.del(`session-${sessionId}`)

        res.clearCookie("session")
        return res.status(200).json({
            message:"logout successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            message:`logout error ${error}`
        })
    }
}