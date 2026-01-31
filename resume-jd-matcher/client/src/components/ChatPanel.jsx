import { useState } from "react";
import { streamQuery } from "../api/queryApi";

function ChatPanel() {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [loading, setLoading] = useState(false)

    const askQuestion = async () => {
        setAnswer("")
        setLoading(true)

        await streamQuery(question, chunk => {
            setAnswer(prev => prev + chunk)
        })

        setLoading(false)
    }

    return (
        <div className="p-6 space-y-6 bg-black text-white min-h-screen">
            <textarea
            className="w-full border border-white bg-black text-white p-2 "
            placeholder="Ask about your resume"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            />

            <button
            onClick={askQuestion}
            className="bg-white text-black px-6 py-2 rounded"
            >
                Ask
            </button>

            <div className="border p-4 min-h-[150px] whitespace-pre-wrap">
                {loading ? "Thinking..." : answer}
            </div>
        </div>
    )
}

export default ChatPanel;