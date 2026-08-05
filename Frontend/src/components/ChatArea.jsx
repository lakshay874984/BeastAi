import React, { useEffect } from 'react'
import Nav from './Nav'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { useDispatch, useSelector } from 'react-redux'
import getMessages from '../features/getMessages'
import { setArtifacts, setMessages } from '../redux/messageSlice'

function ChatArea() {
  const {selectedConversation}=useSelector(state=>state.conversation)
  const { userData } = useSelector(state => state.user)
  const dispatch=useDispatch()
  useEffect(()=>{
  const getMesg2=async () => {
    
   
      dispatch(setMessages([]))
      dispatch(setArtifacts([]))
  }

  getMesg2()
  },[ userData?._id,dispatch])
  useEffect(()=>{
  const getMesg=async () => {
    
    if(selectedConversation){
      if(selectedConversation.title=="New Chat")return;
const data=await getMessages(selectedConversation?._id)
console.log(data)
      dispatch(setMessages(data))
      const latestArtifactMessage=[...data].reverse().find(msg=>msg.artifacts && msg.artifacts.length>0)
      dispatch(setArtifacts(latestArtifactMessage?.artifacts || []))
    }
    
  }

  getMesg()
  },[selectedConversation?._id ])
  return (
    <div className='flex-1 flex flex-col min-w-0'>
      <Nav/>
      <MessageList key={userData?._id}/>
      <ChatInput/>
    </div>
  )
}

export default ChatArea
