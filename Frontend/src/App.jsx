import React, { useEffect } from 'react'
import "./App.css"

import Home from './pages/Home'
import getCurrentUser from './feautres/getCurrentUser'






const App = () => {
useEffect(()=>{
  const getUser = async ()=>{
    const user = await getCurrentUser()
    console.log(user)
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