import fs from "fs"
import pdf from "pdf-parse/lib/pdf-parse.js"

export const extractTextFromPDF = async filePath => {
  const buffer = fs.readFileSync(filePath)

  try {
      const data = await pdf(buffer)

      if (!data.text || data.text.trim().length === 0) {
        throw new Error("PDF contains no readable text")
      }
      return data.text


  } catch (error) {
    throw new Error("Unable to read PDF. It may be encrypted or corrupted")
  }
}
