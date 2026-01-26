import fs from "fs"
import pdf from "pdf-parse/lib/pdf-parse.js"

export const extractTextFromPDF = async filePath => {
  const buffer = fs.readFileSync(filePath)
  const data = await pdf(buffer)
  return data.text
}
