import fs, { stat } from "fs"
import {PDFParse} from "pdf-parse"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { vectorStore } from "../config/vectorDb.js"
import { getModel } from "../config/llmModels.js"
import { HumanMessage, SystemMessage } from "@langchain/core/messages"
import { deductCredits } from "../utils/deductCredits.js"
import { checkAgentLimit } from "../config/agentLimit.js"
export const pdfRag=async (state)=>{


   try {
    await checkAgentLimit(state.userId,"pdf")
      const buffer=fs.readFileSync(state.file.path)// fs.readFileSync(state.file.path) gives the buffer of the uploaded pdf file, buffer is the binary representation of the pdf file, and we can use this buffer to extract the text from the pdf file using pdf-parse library.. we cant give the path of the pdf file to pdf-parse library because it only accepts buffer as input, so we need to read the file and convert it into buffer using fs.readFileSync method.



      const pdf=new PDFParse({
        data:buffer
      }) // pdf-parse library is used to extract the text from the pdf file, it takes the buffer of the pdf file as input and returns the text of the pdf file as output. we can use this text to create a vector store using langchain library and then we can use this vector store to find the relevant documents from the uploaded pdf file based on the user prompt.



      const result=await pdf.getText() // getText method of pdf-parse library is used to extract the text from the pdf file, it returns the text of the pdf file as output. we can use this text to create a vector store using langchain library and then we can use this vector store to find the relevant documents from the uploaded pdf file based on the user prompt.amd the ouput of this like { text: "text of the pdf file", numpages: 10, info: { title: "title of the pdf file", author: "author of the pdf file", subject: "subject of the pdf file", keywords: "keywords of the pdf file", creator: "creator of the pdf file", producer: "producer of the pdf file", creationdate: "creation date of the pdf file", moddate: "modification date of the pdf file" }, metadata: { title: "title of the pdf file", author: "author of the pdf file", subject: "subject of the pdf file", keywords: "keywords of the pdf file", creator: "creator of the pdf file", producer: "producer of the pdf file", creationdate: "creation date of the pdf file", moddate: "modification date of the pdf file" }, version: 1.7, isEncrypted: false, isLinearized: false }



      
      const text=result.text // it gives the text of the pdf file, we can use this text to create a vector store using langchain library and then we can use this vector store to find the relevant documents from the uploaded pdf file based on the user prompt.

      console.log("text extracted from pdf file:",text)




      const spilliter=new RecursiveCharacterTextSplitter({
        chunkSize:1000,
        chunkOverlap:200
      }) 

      const docs=await spilliter.createDocuments([text]) // spilitter takes a array of text as input and returns an array of documents as output, each document is a chunk of text with a maximum length of chunkSize and an overlap of chunkOverlap, we can use these documents to create a vector store using langchain library and then we can use this vector store to find the relevant documents from the uploaded pdf file based on the user prompt.
      // ouput of the docs will be like [{ pageContent: "text of the document", metadata: { source: "source of the document" } }, { pageContent: "text of the document", metadata: { source: "source of the document" } }, { pageContent: "text of the document", metadata: { source: "source of the document" } }, { pageContent: "text of the document", metadata: { source: "source of the document" } }, { pageContent: "text of the document", metadata: { source: "source of the document" } }]

      console.log("docs created from pdf file:",docs)



      const collectionName=`pdf-${Date.now()}`;
      const store=await vectorStore(docs,collectionName)
      

      const relevantDocs=await store.similaritySearch(state.prompt,5) // similaritySearch method of vector store is used to find the relevant documents from the uploaded pdf file based on the user prompt, it takes the user prompt and the number of relevant documents to be returned as input and returns the relevant documents as output. we can use these relevant documents to generate the answer for the user prompt using langchain library.
      // it willgive a ouput like [{ pageContent: "text of the relevant document", metadata: { source: "source of the relevant document" } }, { pageContent: "text of the relevant document", metadata: { source: "source of the relevant document" } }, { pageContent: "text of the relevant document", metadata: { source: "source of the relevant document" } }, { pageContent: "text of the relevant document", metadata: { source: "source of the relevant document" } }, { pageContent: "text of the relevant document", metadata: { source: "source of the relevant document" } }]

      console.log("relevant docs found from pdf file:",relevantDocs)
      
      const context=relevantDocs.map(d=>d.pageContent).join("\n\n")
      console.log("context for LLM:",context)
      const llm=await getModel("pdf-rag")

       const messages=[
        new SystemMessage(`You are BEASTAI PDF Assistant.

Rules:

- Answer ONLY from the uploaded PDF.

- Never make up information.

- If the answer is not present in the PDF, reply:

"I couldn't find this information in the uploaded PDF."

- Use Markdown formatting.
`),

new HumanMessage(`
    Context:${context}
     Question:${state.prompt}
    `)
       ]


      const response=await llm.invoke(messages)
      await deductCredits(state.userId,"pdf")
      console.log(response)
      return {
        ...state,
        aiResponse:response.content
      }



   } catch (error) {
    console.log(error)
         return {
            ...state,
            aiResponse:error?.data?.message || "failed to analyze pdf"
        }
   }finally{
         fs.unlinkSync(state.file.path) // it deletes the uploaded pdf file from the server after processing it, to free up space and avoid cluttering the server with unnecessary files.
   }


}