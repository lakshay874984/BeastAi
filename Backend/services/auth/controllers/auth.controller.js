import { randomUUID } from "crypto"
import { getAuth } from "firebase-admin/auth"
import { app } from "../config/firebase.js"
import User from "../models/user.model.js"

export const login = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { token } = req.body;
        
        console.log("TOKEN:", token);

        const decoded = await getAuth(app).verifyIdToken(token);
        console.log("DECODED:", decoded);

        let user = await User.findOne({ firebaseUid: decoded.uid });
        console.log("USER:", user);

        if (!user) {
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture
            });
        }

        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};