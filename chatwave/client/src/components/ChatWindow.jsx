// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { useSocket } from "../context/SocketContext";
// import { useAuth } from "../context/AuthContext";
// import API from "../utils/api";

// const ChatWindow = () => {
//   const socket = useSocket();
//   const { user } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const fileInputRef = useRef(null);


//   useEffect(() => {
//     if (!socket) return;

//     socket.on("receive_message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     // Typing indicator
//     socket.on("typing_start", () => setIsTyping(true));
//     socket.on("typing_stop", () => setIsTyping(false));

//     return () => {
//       socket.off("receive_message");
//       socket.off("typing_start");
//       socket.off("typing_stop");
//     };
//   }, [socket]);


//   const handleTyping = (e) => {
//     setInput(e.target.value);
//     if (!socket) return;

//     socket.emit("typing_start", {
//       conversationId: "temp",
//       recipientId: "placeholderRecipient",
//     });

//     clearTimeout(window.typingTimeout);
//     window.typingTimeout = setTimeout(() => {
//       socket.emit("typing_stop", {
//         conversationId: "temp",
//         recipientId: "placeholderRecipient",
//       });
//     }, 1000);
//   };

//   // -------------------------------
//   // 3️⃣ Send message (text)
//   // -------------------------------
//   const handleSend = () => {
//     if (!input.trim() || !socket) return;

//     const messageData = {
//       conversationId: "temp",
//       senderId: user.id,
//       recipientId: "placeholderRecipient",
//       text: input.trim(),
//     };

//     socket.emit("send_message", messageData);
//     setMessages((prev) => [...prev, { ...messageData, self: true }]);
//     setInput("");

//     socket.emit("typing_stop", {
//       conversationId: "temp",
//       recipientId: "placeholderRecipient",
//     });
//   };

//   // -------------------------------
//   // 4️⃣ Handle file upload (image)
//   // -------------------------------
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await API.post("/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const imageUrl = res.data.url;

//       // Send image message
//       const messageData = {
//         conversationId: "temp",
//         senderId: user.id,
//         recipientId: "placeholderRecipient",
//         text: imageUrl,
//         image: true,
//       };

//       socket.emit("send_message", messageData);
//       setMessages((prev) => [...prev, { ...messageData, self: true }]);
//     } catch (err) {
//       alert("Image upload failed");
//     }
//   };

 
//   return (
//     <div className="h-full flex flex-col justify-between">
//       {/* Message list */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`max-w-xs p-2 rounded-lg ${
//               msg.self
//                 ? "bg-blue-500 text-white ml-auto"
//                 : "bg-white text-gray-800"
//             }`}
//           >
//             {/* If message is image, render image */}
//             {msg.text.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
//               <img
//                 src={msg.text}
//                 alt="upload"
//                 className="rounded-md max-w-full"
//               />
//             ) : (
//               msg.text
//             )}
//           </div>
//         ))}

//         {/* Typing indicator */}
//         {isTyping && (
//           <div className="italic text-gray-500 text-sm">
//             Someone is typing...
//           </div>
//         )}
//       </div>

//       {/* Input and file upload section */}
//       <div className="border-t flex p-2 gap-2 bg-white items-center">
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           ref={fileInputRef}
//           onChange={handleFileUpload}
//         />
//         <Button variant="outline" onClick={() => fileInputRef.current.click()}>
//           📎
//         </Button>

//         <Input
//           placeholder="Type a message..."
//           value={input}
//           onChange={handleTyping}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />

//         <Button onClick={handleSend}>Send</Button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;




import React, { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";

const ChatWindow = ({ selectedChat }) => {
  const socket = useSocket();
  const { user } = useAuth();
  const [allMessages, setAllMessages] = useState({});
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);

  const messages = selectedChat ? allMessages[selectedChat.id] || [] : [];

  //  Helper: Add message to correct chat thread
  const addMessage = (chatId, msg) => {
    setAllMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), msg],
    }));
  };

  // -------------------------------
  // 1️ Listen for messages + typing
  // -------------------------------
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (msg) => {
      addMessage(msg.conversationId, msg);
    };

    const handleTypingStart = (data) => {
      if (selectedChat && data.conversationId === selectedChat.id) {
        setIsTyping(true);
      }
    };

    const handleTypingStop = (data) => {
      if (selectedChat && data.conversationId === selectedChat.id) {
        setIsTyping(false);
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("typing_start", handleTypingStart);
    socket.on("typing_stop", handleTypingStop);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("typing_start", handleTypingStart);
      socket.off("typing_stop", handleTypingStop);
    };
  }, [socket, selectedChat]);

  // -------------------------------
  // 2️ Handle typing indicator
  // -------------------------------
  const handleTyping = (e) => {
    const value = e.target.value;
    setInput(value);
    if (!socket || !selectedChat) return;

    socket.emit("typing_start", {
      conversationId: selectedChat.id,
      recipientId: selectedChat.recipientId,
    });

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("typing_stop", {
        conversationId: selectedChat.id,
        recipientId: selectedChat.recipientId,
      });
    }, 1000);
  };

  // -------------------------------
  // 3️ Send text message
  // -------------------------------
  const handleSend = () => {
    if (!input.trim() || !socket || !selectedChat) return;

    const messageData = {
      conversationId: selectedChat.id,
      senderId: user?.id || "tempUser",
      recipientId: selectedChat.recipientId,
      text: input.trim(),
      self: true,
    };

    socket.emit("send_message", messageData);
    addMessage(selectedChat.id, messageData);
    setInput("");

    socket.emit("typing_stop", {
      conversationId: selectedChat.id,
      recipientId: selectedChat.recipientId,
    });
  };

  // -------------------------------
  //  Handle file upload (image)
  // -------------------------------
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedChat) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data.url;

      const messageData = {
        conversationId: selectedChat.id,
        senderId: user?.id || "tempUser",
        recipientId: selectedChat.recipientId,
        text: imageUrl,
        image: true,
        self: true,
      };

      socket.emit("send_message", messageData);
      addMessage(selectedChat.id, messageData);
    } catch (err) {
      alert("Image upload failed");
    }
  };

  // -------------------------------
  //  Render if no chat selected
  // -------------------------------
  if (!selectedChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-gray-50">
        Select a user to start chatting
      </div>
    );
  }

  // -------------------------------
  //  UI Rendering
  // -------------------------------
  return (
    <div className="h-full flex flex-col justify-between">
      {/* Header */}
      <div className="p-3 border-b bg-gray-50 font-semibold">
        Chat with {selectedChat.name}
      </div>

      {/* Message List */}
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
            {msg.text.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
              <img
                src={msg.text}
                alt="upload"
                className="rounded-md max-w-full"
              />
            ) : (
              msg.text
            )}
          </div>
        ))}

        {isTyping && (
          <div className="italic text-gray-500 text-sm">
            {selectedChat.name} is typing...
          </div>
        )}
      </div>

      {/* Input and file upload section */}
      <div className="border-t flex p-2 gap-2 bg-white items-center">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        <Button variant="outline" onClick={() => fileInputRef.current.click()}>
          📎
        </Button>

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

