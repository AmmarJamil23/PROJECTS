export const streamQuery = async (question, onChunk) => {
    const response = await fetch("http://localhost:4000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
    })

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const text = decoder.decode(value)
        onChunk(text)
    }
}