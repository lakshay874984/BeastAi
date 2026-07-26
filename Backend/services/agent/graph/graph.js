import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { visionAgent } from "../agents/vision.agent.js";
import { pdfRag } from "../agents/pdfRag.agent.js";
import { imageAnalyzer } from "../agents/imageAnalyzer.agent.js";


//Nodes = functions (agents)
//Edges = connections between nodes
//State = shared data that flows through every node
const workflow=new StateGraph(agentState)
 // const workflow = new StateGraph(StateDefinition);


 // workflow.addNode("nodeName", functionName);
 // add node just asssign the name to the agent (agent is just a fucntion by the way)  like for the chat agent the name assigned is the chat
workflow.addNode("router",router)
workflow.addNode("chat",chatAgent)
workflow.addNode("search",searchAgent)
workflow.addNode("coding",codingAgent)
workflow.addNode("pdf",pdfAgent)
workflow.addNode("ppt",pptAgent)
workflow.addNode("vision",visionAgent)
workflow.addNode("pdfRag",pdfRag)
workflow.addNode("imageAnalyzer",imageAnalyzer)
// start node is given by default by the langraph  and add edge is used to connect diffent nodes with each other


/*
workflow.addConditionalEdges(
    "sourceNode",                 // Node after which routing happens

    (state) => {
        // Decide where to go based on the state
        return "routeKey";
    },

    {
        routeKey: "destinationNode",
        anotherKey: "anotherDestinationNode",
        defaultKey: "defaultDestinationNode"
    }
);
*/



/* workflow.addEdge(
    "sourceNode",
    "destinationNode"
);
*/
workflow.addEdge("__start__","router")
workflow.addConditionalEdges("router",(state)=>{
   switch (state.agent) {
    case "chat":
     return "chat";
    case "search":
     return "search";
    case "coding":
     return "coding";
    case "pdf":
     return "pdf";
    case "ppt":
     return "ppt";
    case "vision":
     return "vision";
    case "pdfRag":
     return "pdfRag";
     case "imageAnalyzer":
     return "imageAnalyzer";  
    default:
     return "chat"
   }
},{ 
   chat:"chat",
   search:"search",   // key value that is search will be match 
   coding:"coding",
   pdf:"pdf" ,
   ppt:"ppt" ,
   vision:"vision",
   pdfRag:"pdfRag",
   imageAnalyzer :"imageAnalyzer"
})   //third one is called the pathmap it check the reutned value in 2nd bracket and the value  that matches with the key value that is chat and thr value of that key that is "chat"  is matched with the add node section where name is defiend of all the node and the agent that is asscoiated with the name is runned
  
//Only the selected path is executed, not all of them.
workflow.addEdge("search","chat")
workflow.addEdge("chat","__end__")
workflow.addEdge("coding","__end__")
workflow.addEdge("pdf","__end__")
workflow.addEdge("ppt","__end__")
workflow.addEdge("vision","__end__")
workflow.addEdge("pdfRag","__end__")
workflow.addEdge("imageAnalyzer","__end__")

export const graph=workflow.compile()  //Without compile(), your graph is just a blueprint. It cannot run.