import { extractTextFromPDF } from "../services/pdf.service"

export const uploadResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" })
    }

    const text = await extractTextFromPDF(req.file.path)

    res.json({
        message: "PDF parsed successfully",
        preview: text.slice(0, 500)
    })
}