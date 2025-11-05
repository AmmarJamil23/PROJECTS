import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";

const ChatWindow = () => {
  const socket = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  // Send message
  const handleSend = () => {
    if (!input.trim()) return;

    const messageData = {
      conversationId: "temp",
      senderId: user.id,
      recipientId: "placeholderRecipient", // later this will be dynamic
      text: input.trim(),
    };

    // Emit event
    socket.emit("send_message", messageData);

    // Show immediately in UI
    setMessages((prev) => [...prev, { ...messageData, self: true }]);
    setInput("");
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs p-2 rounded-lg ${
              msg.self ? "bg-blue-500 text-white ml-auto" : "bg-white text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="border-t flex p-2 gap-2 bg-white">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default ChatWindow;
