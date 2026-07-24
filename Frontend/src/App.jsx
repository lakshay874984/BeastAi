import React from 'react'
import "./App.css"






const App = () => {
 const handleLogin = async (token)=>{
  try {
    const {data} = await api.post("/auth/login",
      
      {token})
    console.log(data)
  } catch (error) {
    console.log("login rorr ",error)
  }
 }


  const GoogleLogin = async() =>{
    const data = await signInWithPopup(auth,googleProvider)
    const token = await data.user.getIdToken()
    console.log(token)
    await handleLogin(token)
    console.log(data)

  }


  return (
    <div className='bg-amber-500 w-fit flex items-center justify-center'>
      <div onClick={GoogleLogin}>Continue With Google</div></div>
  )
}

export default App