import { useState } from "react";
import { streamQuery } from "../api/queryApi";

function ChatPanel() {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [loading, setLoading] = useState(false)

    const askQuestion = async () => {
        setAnswer("")
        setLoading(true)
        try {
        await streamQuery(question, chunk => {
            setAnswer(prev => prev + chunk)
        }) } 
        catch (error) {
            if (error.name !== "Abort error") {
                console.error(error)
            }
        }

        setLoading(false)
    }

    return (
        <div className="p-6 space-y-6 bg-black text-white min-h-screen">
            <h2 className="text-white font-semibold">Ask About Your Resume</h2>

            <textarea
            className="w-full border border-white bg-black text-white p-2 "
            placeholder="Example: What skills am I missing for a backend role"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            disabled={loading}
            />

            <button
            onClick={askQuestion}
            disabled={loading || !question}
            className="bg-white text-black px-6 py-2 rounded"
            >
                Ask 
            </button>

            <div className="border p-4 min-h-37.5 whitespace-pre-wrap">

                {loading && !answer && (
                    <div className="space-y-2 animate-pulse">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>


                    </div>
                )}

                {!loading && answer && answer}

                {!loading && !answer && (
                    <div className="text-gray-500">
                        Answer will appear here
                    </div>
                )}

            </div>
        </div>
    )
}

export default ChatPanel;