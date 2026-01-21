const uploadPdf = async (req, res) => {
    try {
        res.status(200).json({
            message: "Upload endpoint ready."
        });

    } catch (error) {
        res.status(500).json({ error: "Upload failed"});
    }
};

module.exports = { uploadPdf };