import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { useSocket } from "../context/SocketContext";

const Sidebar = () => {
  const [inbox, setInbox] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    
    setInbox([
      { id: "1", name: "Daniyal", lastMessage: "Hey there!", typing: false },
      { id: "2", name: "Adnan", lastMessage: "How are you?", typing: false },
    ]);

    socket.on("inbox_update", (data) => {
      setInbox((prev) =>
        prev.map((chat) =>
          chat.id === data.conversationId
            ? { ...chat, lastMessage: data.lastMessage }
            : chat
        )
      );
    });

    socket.on("typing_update", (data) => {
      setInbox((prev) =>
        prev.map((chat) =>
          chat.id === data.conversationId
            ? { ...chat, typing: data.typing }
            : chat
        )
      );
    });

    return () => {
      socket.off("inbox_update");
      socket.off("typing_update");
    };
  }, [socket]);

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {inbox.map((chat) => (
        <Card key={chat.id} className="m-2 shadow-sm cursor-pointer">
          <CardContent className="p-3">
            <div className="flex justify-between">
              <h3 className="font-semibold">{chat.name}</h3>
              <span className="text-xs text-gray-400">2:45 PM</span>
            </div>
            <p className="text-sm text-gray-600">
              {chat.typing ? (
                <span className="text-green-500 font-medium">Typing...</span>
              ) : (
                chat.lastMessage
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Sidebar;
