import { ChatOllama } from "@langchain/community/chat_models/ollama"

export const llm = new ChatOllama({
    model: "qwen2.5:3b",
    baseUrl: process.env.OLLAMA_BASE_URL,
    temperature: 0
})