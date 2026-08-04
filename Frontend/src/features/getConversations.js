import api from "../../utils/axios"
// it is just used to get the conversstion from the database
export const getConversations=async () => {
    try {
        const {data}=await api.get("/api/chat/get-conversations")
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}