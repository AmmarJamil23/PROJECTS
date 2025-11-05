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
  const [isTyping, setIsTyping] = useState(false);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Listen for typing status
    socket.on("typing_start", () => setIsTyping(true));
    socket.on("typing_stop", () => setIsTyping(false));

    return () => {
      socket.off("receive_message");
      socket.off("typing_start");
      socket.off("typing_stop");
    };
  }, [socket]);

  // Handle typing indicator
  const handleTyping = (e) => {
    setInput(e.target.value);

    if (!socket) return;

    // Notify others that this user started typing
    socket.emit("typing_start", {
      conversationId: "temp",
      recipientId: "placeholderRecipient",
    });

    // Stop typing after 1 second of no input
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("typing_stop", {
        conversationId: "temp",
        recipientId: "placeholderRecipient",
      });
    }, 1000);
  };

  // Send message
  const handleSend = () => {
    if (!input.trim() || !socket) return;

    const messageData = {
      conversationId: "temp",
      senderId: user.id,
      recipientId: "placeholderRecipient",
      text: input.trim(),
    };

    // Emit message event
    socket.emit("send_message", messageData);

    // Show message instantly in UI
    setMessages((prev) => [...prev, { ...messageData, self: true }]);
    setInput("");

    // Stop typing after send
    socket.emit("typing_stop", {
      conversationId: "temp",
      recipientId: "placeholderRecipient",
    });
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs p-2 rounded-lg ${
              msg.self
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="italic text-gray-500 text-sm">Someone is typing...</div>
        )}
      </div>

      <div className="border-t flex p-2 gap-2 bg-white">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={handleTyping}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default ChatWindow;
