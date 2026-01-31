import { Router } from "express"
import { queryResume } from "../controllers/query.controller.js"

const router = Router()

router.post("/", queryResume)

export default router