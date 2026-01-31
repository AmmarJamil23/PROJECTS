import express from "express"
import cors from "cors"
import healthRoutes from "./routes/health.routes.js"
import uploadRoutes from "./routes/upload.routes.js"
import queryRoutes from "./routes/query.routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/health", healthRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/query", queryRoutes)

export default app