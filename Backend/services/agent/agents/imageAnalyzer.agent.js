
import { HumanMessage, SystemMessage } from "@langchain/core/messages"
import { getModel } from "../config/llmModels.js"
import fs from "fs/promises"
import { deductCredits } from "../utils/deductCredits.js"
import { checkAgentLimit } from "../config/agentLimit.js"
export const imageAnalyzer =async (state) => {
     await checkAgentLimit(state.userId,"image")
    try {
        const llm = await getModel("imageAnalyzer")

        const imageBuffer = await fs.readFile(state.file.path) // it will read the image file from the path and return a buffer of the image file, we can use this buffer to convert it to base64 format and then we can use this base64 format to send it to the llm model for analysis. 
        const base64Image = imageBuffer.toString("base64") // we conveert it into the base64 format because the llm model accepts the image in base64 format, and we can use this base64 format to send it to the llm model for analysis.

        const messages = [
            new SystemMessage(
                `You are BeastAI image analyzer Agent.

Rules:

- Analyze only the uploaded image.
- Answer the user's question accurately.
- If text exists in the image, extract it.
- If charts or tables exist, explain them.
- If something is unclear, say so.
- Use Markdown when helpful.
- Do not hallucinate.
`
            ),
            new HumanMessage(
                {
                    content: [
                        {
                            type: "text",
                            text: state.prompt || "analyze the image"
                        },
                        {
                            type:"image_url", // this tells the llm model that the image is in base64 format and it is of the type of the mimetype of the uploaded image file, and we can use this base64 format to send it to the llm model for analysis. suppose the uploaded image file is of type png then the mimetype will be image/png and the llm model will know that the image is of type png and it will analyze it accordingly. and base64image contains the base64 format of the uploaded image file, and we can use this base64 format to send it to the llm model for analysis.
                            "image_url":{
                                url:`data:${state.file.mimetype};base64,${base64Image}` // this tells the llm model that the image is in base64 format and it is of the type of the mimetype of the uploaded image file, and we can use this base64 format to send it to the llm model for analysis. suppose the uploaded image file is of type png then the mimetype will be image/png and the llm model will know that the image is of type png and it will analyze it accordingly. and base64image contains the base64 format of the uploaded image file, and we can use this base64 format to send it to the llm model for analysis.
                            }
                        }
                    ]
                }

            )
        ]

const response=await llm.invoke(messages)
 await deductCredits(state.userId,"vision")
return {
    ...state,
    aiResponse:response.content
}

    } catch (error) {
       console.log(error)
         return {
            ...state,
            aiResponse:error?.data?.message || "failed to analyze image"
        
}
    }
    finally{
      await fs.unlink(state.file.path)
    }
}