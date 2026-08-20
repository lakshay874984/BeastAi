import { signInWithPopup } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth, googleProvider } from '../../utils/firebase'
import api from '../../utils/axios'
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { setUserdata } from '../redux/userSlice';
import SideBar from '../components/SideBar';
import ChatArea from '../components/ChatArea';
import Artifact from '../components/Artifact';

function Home() {
    const {userData}=useSelector(state=>state.user)
   
    const dispatch=useDispatch()
    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/api/auth/login", { token })
            // window.location.reload();
            dispatch(setUserdata(data))
            
        } catch (error) {
            console.log(error)
        }
    }


    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider)
        const token = await data.user.getIdToken()
        console.log(token)
        await handleLogin(token)
        console.log(data)
    }
    return (
        <div className='h-screen  flex bg-[#0d0f14] text-white overflow-hidden'>
            
{!userData ?      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">

        {/* Video Background */}
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
        >
            <source src="https://ik.imagekit.io/phesmi8ni/145578-787481766_medium.mp4" type="video/mp4" />
        </video>

        {/* Red + Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/10 via-black/60 to-black/90" />

        {/* Blur */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />

        {/* Login Card */}
        <div className="relative z-10 w-[360px] rounded-2xl border border-red-500/20 bg-black/50 backdrop-blur-xl p-7 shadow-2xl shadow-red-950/40">

            {/* Logo / Heading */}
            <div className="flex flex-col gap-2 mb-6">
                <h2 className="text-xl font-semibold text-white tracking-tight">
                    Welcome to <span className="text-red-500">BeastAI</span>
                </h2>

                <p className="text-sm text-gray-400">
                    Sign in to continue using BeastAI.
                </p>
            </div>

            {/* Google Login */}
            <button
                onClick={googleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl
                bg-white hover:bg-gray-100
                text-black font-medium text-sm
                transition-all duration-200
                hover:scale-[1.01]
                active:scale-[0.98]"
            >
                <FcGoogle size={18} />
                Continue with Google
            </button>

            <p className="text-[11px] text-center text-gray-500 mt-5">
                Secure authentication powered by Google
            </p>
        </div>

    </div>
            :
            <><SideBar/>
<ChatArea/>
<Artifact/></>}






          
        </div>
    )
}

export default Home