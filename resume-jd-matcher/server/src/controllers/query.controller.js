import { embeddings } from "../services/embedding.service.js"
import { retrieveRelevantChunks } from "../services/retrieval.service.js"
import { llm } from "../services/llm.service.js"

export const queryResume = async (req, res) => {
    const { question } = req.body

    if (!question) {
        return res.status(400).json({ error: "Question required"})
    }

    const queryEmbedding = await embeddings.embedQuery(question)

    const chunks = await retrieveRelevantChunks(queryEmbedding, 5)

    const context = chunks.map(c => c.content).join("\n")

      const prompt = `
        You are a resume analyzer.

        Rules
        Use only the provided resume content.
        If something is not in resume, say "Not found in resume".

        Resume Content:
        ${context}

        Question:
        ${question}

        Answer in this JSON format:
        {
        "match_score": number,
        "relevant_skills": [],
        "missing_skills": [],
        "improvement_suggestions": []
        }
      `
      const response = await llm.invoke(prompt)
      
      const parsed = JSON.parse(response.content)
      res.json(parsed)
}