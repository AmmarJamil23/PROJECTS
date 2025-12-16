import express from "express"
import cors from "cors"
import morgan from "morgan"

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

const tasks = [];

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));

}
function blockThread(ms) {
    const start = Date.now();

    while (Date.now() - start < ms) {}
}

app.post("/api/tasks", async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required"});
    }

    const task = {
        id: tasks.length + 1,
        title
    };

    tasks.push(task);

    delay(3000).then(() => {
        console.log("Background work finished for task:", task.id);
    });

    res.status(201).json({
        message: "Task created",
        task
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Backend is alive",
        timestamp: Date.now()
    });
});

export default app;

