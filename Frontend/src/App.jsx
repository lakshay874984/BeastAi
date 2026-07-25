import React, { useEffect } from 'react'
import "./App.css"

import Home from './pages/Home'
import getCurrentUser from './feautres/getCurrentUser'
import { useDispatch } from 'react-redux'
import { setUserdata } from './redux/userSlice'






const App = () => {

 const  dispatch = useDispatch()
useEffect(()=>{
  const getUser = async ()=>{
    const user = await getCurrentUser()
    dispatch(setUserdata(user))
  } 
  getUser()
},[])


  return (
   <>
   <Home />
   </>
  )
}

export default App