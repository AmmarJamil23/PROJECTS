import { extractTextFromPDF } from "../services/pdf.service.js"
import { chunkText } from "../services/chunk.service.js"
import { embeddings } from "../services/embedding.service.js"
import { storeChunks } from "../services/vector.service.js"

export const uploadResume = async (req, res) => {
  try {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" })
  }

  const text = await extractTextFromPDF(req.file.path)
  const chunks = chunkText(text)

  if (chunks.length === 0) {
    return res.status(400).json({ error: "Resume has no usable content"})
  }

  const vectors = []

  for (const chunk of chunks) {
    const embedding = await embeddings.embedQuery(chunk)
    vectors.push({ text: chunk, embedding })
  }

  await storeChunks(vectors)

  res.json({
    message: "Resume stored in vector DB",
    chunksStored: vectors.length
  })
}
  catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}
