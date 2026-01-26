import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama"

export const embeddings = new OllamaEmbeddings({
  model: "qwen2.5:3b",
  baseUrl: process.env.OLLAMA_BASE_URL
})
