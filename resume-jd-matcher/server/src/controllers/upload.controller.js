export const uploadResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" })
    }

    res.json({
        message: "Resume received",
        filename: req.file.originalname
    })
}