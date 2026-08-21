import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { getModel } from "../config/llmModels.js"
import { getMemory } from "../config/memory.js"
import { deductCredits } from "../utils/deductCredits.js"
import { checkAgentLimit } from "../config/agentLimit.js"

export const chatAgent = async (state) => {

   

    try {

        await checkAgentLimit(state.userId,"chat")

         const llm = await getModel("chat")

    const history = await getMemory(state.conversationId)
    console.log("reusltstadvs sjc kcjkvbkvbkjvkv",state.searchResults)

   const searchContext=state.searchResults?`
   Web Search Results:

${JSON.stringify(state.searchResults)}

Answer the user using only the above search results.
`:""


    const systemPrompt = `
    You are BeastAI, an intelligent AI assistant.

 
    ${searchContext}

    If searchContext exists:

- Use search results to answer.
- Do not mention internal tools.


    Rules:

- For simple questions, greetings, and short queries, respond naturally in plain text.
- For technical, educational, coding, or detailed topics, use clean Markdown.


 Formatting:

- Use # for titles and ## for sections.
- Leave a blank line after headings.
- Use bullet points for lists.
- Use numbered lists for steps.
- Use fenced code blocks with language tags for code.
- Keep paragraphs short and readable.
- Never write headings and content on the same line.
- Never generate large walls of text.
`
    const messages = [
        new SystemMessage(systemPrompt)  // A SystemMessage tells the model how it should behave. It is like instructions given before the conversation starts.
    ]

    history.forEach(msg => {
        if (msg.role == "user") {
            messages.push(new HumanMessage(msg.content)) // A HumanMessage represents something the user says.
        }
        if (msg.role == "assistant") {
            messages.push(new AIMessage(msg.content))
        }
    });

    messages.push(new HumanMessage(state.prompt)) //An AIMessage represents a previous response from the assistant. You don't create this for the new response. Instead, you recreate previous assistant replies so the model remembers the conversation.That means the AI REMEBERS THE COVERANTIONS THAT HAPPEN BETWEEN HUMAN AND ASSISTANT 



    // console.log(messages)

    /*
   
[
  SystemMessage {
    "content": "\n    You are BeastAI, an intelligent AI assistant.\n\n \n    \n\n    If searchContext exists:\n\n- Use search results to answer.\n- Do not mention internal tools.\n\n\n    Rules:\n\n- For simple questions, greetings, and short queries, respond naturally in plain text.\n- For technical, educational, coding, or detailed topics, use clean Markdown.\n\n\n Formatting:\n\n- Use # for titles and ## for sections.\n- Leave a blank line after headings.\n- Use bullet points for lists.\n- Use numbered lists for steps.\n- Use fenced code blocks with language tags for code.\n- Keep paragraphs short and readable.\n- Never write headings and content on the same line.\n- Never generate large walls of text.\n",
    "additional_kwargs": {},
    "response_metadata": {}
  },
  HumanMessage {
    "content": "who are you",
    "additional_kwargs": {},
    "response_metadata": {}
  },
  HumanMessage {
    "content": "who are you",
    "additional_kwargs": {},
    "response_metadata": {}
  },
  AIMessage {
    "content": "I’m BeastAI, an intelligent AI assistant here to help you with any questions or tasks you have. Feel free to ask me anything!",
    "additional_kwargs": {},
    "response_metadata": {},
    "tool_calls": [],
    "invalid_tool_calls": []
  },
  HumanMessage {
    "content": "okie my name is lakshay",
    "additional_kwargs": {},
    "response_metadata": {}
  },
  AIMessage {
    "content": "Nice to meet you, Lakshay! How can I assist you today?",
    "additional_kwargs": {},
    "response_metadata": {},
    "tool_calls": [],
    "invalid_tool_calls": []
  },
  HumanMessage {
    "content": "what is my name",
    "additional_kwargs": {},
    "response_metadata": {}
  },
  AIMessage {
    "content": "Your name is Lakshay.",
    "additional_kwargs": {},
    "response_metadata": {},
    "tool_calls": [],
    "invalid_tool_calls": []
  },
  HumanMessage {
    "content": "what are the things i have asked from you till now",
    "additional_kwargs": {},
    "response_metadata": {}
  }
]
    */


    const response = await llm.invoke(messages)
      await deductCredits(state.userId,"chat")
   
    return {
        ...state,
        aiResponse: response.content,
        
    }
    } catch (error) {
        console.log(error)
         return {
            ...state,
            aiResponse:error?.data?.message || "failed to generate chat"
        }
        
    
    }
   
}