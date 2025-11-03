ChatWave Backend and Frontend Setup (Progress Documentation)

This is the current progress of my ChatWave project, which is a MERN stack based chat application that I am building step by step to understand how a real chat system works from backend to frontend.

1. Project Overview

ChatWave is a full-stack chat application that allows users to register, log in, start private conversations, and send messages.
So far, I have completed the backend (Node.js + Express + MongoDB) and started working on the frontend (React + Vite + Tailwind + Shadcn UI).
The goal is to make a real-time chat app similar to WhatsApp or Messenger, but built with clean, modern code.

2. Backend (Server Side)
Technologies Used

Node.js and Express for server and API handling

MongoDB with Mongoose for database

JWT (JSON Web Tokens) for authentication

Socket.io for real-time chat

dotenv for environment variables

CORS and middleware setup for API security and structure

Main Features Implemented
a) Authentication (Login, Register, Token)

I have implemented user authentication where users can register with name, email, and password.
After successful login, the server sends back a JWT token.
This token is stored in the browser’s localStorage and is attached automatically with every request using Axios interceptors.

b) Models (MongoDB Schema)

There are three main models:

User Model – stores name, email, password, and status.

Conversation Model – keeps participants and last message.

Message Model – stores sender, text, and seen status.

These models are connected using MongoDB’s ObjectId references.

c) Controllers

I created controllers to separate logic from routes.
Each controller handles API operations such as:

Creating or getting a conversation between two users.

Sending and fetching messages.

Handling login, register, and user data fetching.

d) Routes

I created routes for different purposes:

/api/auth for login and register.

/api/conversations for chat management.

/api/messages for sending and receiving messages.

All routes are protected by an authentication middleware that checks the JWT token before giving access.

e) Middleware

A custom authMiddleware checks if the token sent from frontend is valid.
If yes, it allows access to protected routes; otherwise, it blocks the request.

f) Socket.io Setup

I added Socket.io to handle real-time events.
When a user connects, they are identified using their token.
Messages are sent instantly using events like send_message and receive_message.
Each user joins a private room based on their ID, allowing one-to-one messaging.

g) MongoDB and Server Connection

I used a .env file to store environment variables such as:

MONGO_URI=mongodb://127.0.0.1/chatwave
PORT=5000
JWT_SECRET=supersecretkey123


The server successfully connects to MongoDB and runs on port 5000.

3. Frontend (Client Side)
Technologies Used

React (with Vite)

Tailwind CSS for styling

Shadcn/UI for prebuilt modern components

Axios for API requests

React Router DOM for navigation

Frontend Setup Process
a) Vite Setup

I initialized the frontend using Vite because it is fast and supports modern React projects.
I also configured an alias @ in vite.config.js for clean imports like:

import { Button } from "@/components/ui/button";

b) Tailwind CSS Installation

I installed Tailwind CSS using official documentation and created the required tailwind.config.js and postcss.config.js.
Then I added the Tailwind directives in the main CSS file.

c) Shadcn UI Integration

I installed Shadcn UI for beautiful and reusable UI components.
It automatically created a src/components/ui/ folder with ready-to-use components like Button, Input, Card, and Avatar.

d) Axios Setup

I created a custom Axios instance in src/utils/api.js to handle API calls.
The code automatically adds the JWT token from localStorage to every request.
This helps in sending authenticated requests without writing headers again and again.

e) Auth Context

I implemented authentication context using React Context API.
This file handles login, register, logout, and user persistence using localStorage.
When a user logs in, their token is stored and the user data is fetched automatically.
The app can access useAuth() hook anywhere to check if the user is logged in or not.

f) Folder Structure

The current frontend folder structure looks like this:

src/
 ┣ components/
 ┃ ┗ ui/
 ┣ context/
 ┃ ┣ AuthContext.jsx
 ┃ ┗ useAuth.js
 ┣ pages/
 ┣ utils/
 ┃ ┗ api.js
 ┣ App.jsx
 ┗ main.jsx

4. Testing and Results

The backend server starts successfully with MongoDB connected.

The API routes for authentication, conversation, and message work correctly using Postman.

Tokens are generated properly and verified through middleware.

The frontend builds successfully and runs on port 5173.

The Shadcn components render correctly with Tailwind styling.

Axios interceptors and the AuthContext are working fine.

5. Problems Faced and Solutions

.env Path Issue:
The backend was not reading .env because I ran nodemon from the root folder.
I fixed it by adding the correct path to dotenv or by running from the right folder.

Fast Refresh Warning:
React showed “Fast refresh only works when a file only exports components.”
I solved it by moving the useAuth hook into a separate file.

Tailwind CLI Missing:
The Tailwind binary was missing, so I reinstalled it and used the correct command to initialize config files.

React Router DOM Missing:
The frontend failed to start because react-router-dom was not installed.
Installing it solved the issue.

6. What’s Next

Build the frontend UI for login, register, and chat pages.

Connect Socket.io in the frontend for live messaging.

Add user presence (online/offline) and message seen status.

Deploy both backend and frontend using Render or Vercel.

7. Conclusion

So far, I have built a solid backend for ChatWave and configured the frontend structure properly with Tailwind and Shadcn UI.
The authentication flow is complete, the database works smoothly, and all APIs are tested successfully.
Now, I am ready to move forward and start building the chat interface and real-time features on the frontend.