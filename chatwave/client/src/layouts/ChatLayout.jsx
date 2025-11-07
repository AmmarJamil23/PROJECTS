// import React from "react";
// import Sidebar from "../components/Sidebar";
// import ChatWindow from "../components/ChatWindow";

// const ChatLayout = () => {
//   return (
//     <div className="h-screen flex flex-col sm:flex-row">
//       {/* Sidebar */}
//       <div className="w-full sm:w-1/3 lg:w-1/4 border-r border-gray-200 bg-gray-50">
//         <Sidebar />
//       </div>

//       {/* Chat Window */}
//       <div className="flex-1 bg-white">
//         <ChatWindow />
//       </div>
//     </div>
//   );
// };

// export default ChatLayout;


import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const ChatLayout = () => {
  // Step 1: Manage selected chat state
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="h-screen flex flex-col sm:flex-row">
      {/* Sidebar */}
      <div className="w-full sm:w-1/3 lg:w-1/4 border-r border-gray-200 bg-gray-50">
        {/* Step 2: Pass setSelectedChat and selectedChat */}
        <Sidebar
          onSelectChat={setSelectedChat}
          selectedChat={selectedChat}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-white">
        {/* Step 3: Pass selectedChat as prop */}
        <ChatWindow selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default ChatLayout;








