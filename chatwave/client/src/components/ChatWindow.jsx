import React from "react";
import { Card, CardContent } from "./ui/card";

const ChatWindow = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-gray-500">
      <Card className="m-3 w-11/12 sm:w-3/4 lg:w-1/2 text-center">
        <CardContent className="p-6">
          Select a chat to start messaging 💬
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatWindow;
