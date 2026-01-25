import { Router } from "express"
import multer from "multer"
import { uploadResume } from "../controllers/upload.controller.js"

const router = Router()

const upload = multer({ dest: "upload/" })

router.post("/resume", upload.single("file"), uploadResume)

export default router