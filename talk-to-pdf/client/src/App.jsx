import { useState, useRef } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const streamBufferRef = useRef("");
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);

    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
      signal: controller.signal
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let done = false;
    streamBufferRef.current = "";

    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      const chunk = decoder.decode(value || new Uint8Array(), { stream: true });
      streamBufferRef.current += chunk;

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].content = streamBufferRef.current;
        return updated;
      });
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="border p-2">
            <b>{m.role}</b>: {m.content}
          </div>
        ))}

        {loading && (
          <div className="animate-pulse border p-2">
            AI is thinking...
          </div>
        )}
      </div>

      <input
        className="border p-2 w-full mt-4"
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <button
        className="bg-black text-white px-4 py-2 rounded mt-2"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}

export default App;
