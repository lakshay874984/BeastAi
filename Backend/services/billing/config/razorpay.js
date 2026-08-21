import Razorpay from "razorpay"
import dotenv from "dotenv"
dotenv.config()
const razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

export default razorpay
// this file is used to configure razorpay and we will use this file in our payment controller to create order in razorpay and then we will get orderId from razorpay and then we will save it in our database
// and this file is taken from the documentation of razorpay and we have to install razorpay package in our project to use this file and we have to create an account in razorpay to get key_id and key_secret and we have to set these values in our .env file