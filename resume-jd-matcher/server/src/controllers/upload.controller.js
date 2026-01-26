import { extractTextFromPDF } from "../services/pdf.service.js"
import { chunkText } from "../services/chunk.service.js"
import { embeddings } from "../services/embedding.service.js"

export const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" })
  }

  const text = await extractTextFromPDF(req.file.path)

  const chunks = chunkText(text)

  const firstEmbedding = await embeddings.embedQuery(chunks[0])

  res.json({
    message: "PDF parsed successfully",
    chunkCount: chunks.length,
    embeddingLength: firstEmbedding
    .length
  })
}
