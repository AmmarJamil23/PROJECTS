import { useState, useRef} from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const streamBufferRef = useRef("");

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input};
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ question: input })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let done = false;
    streamBufferRef.current = "";

    setMessages(prev => [...prev, { role: "assistant", content: ""}]);

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      const chunk = decoder.decode(value || new Uint8Array(), { stream: true });
      streamBufferRef.current += chunk;

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].content = streamBufferRef.current;
        return updated;
      })
    };
  };
  return (
    <div>

    </div>
  )

}

export default App;