import api from "../../utils/axios"
// this file is to create a conversation model in the mongodb
export const createConversation=async () => {
    try {
        const {data}=await api.get("/api/chat/create-conversation")
        return data
    } catch (error) {
       console.log(error)
       return []
    }
}