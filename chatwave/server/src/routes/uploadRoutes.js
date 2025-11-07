const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/',authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const fileBuffer = req.file.buffer.toString("base64");

        const uploaded = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${fileBuffer}`,
            {folder: "chatwave_uploads"}
        );

        res.json({ url: uploaded.secure_url });

    } catch (error){
        console.log("Upload failed", error);
        res.status(500).json({ message: "Upload failed "});
    }
});

module.exports = router;