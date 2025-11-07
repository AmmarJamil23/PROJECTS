const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { Server } = require('socket.io');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});

//This is the Socket Authentication middleware
io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    const jwt = require('jsonwebtoken');
    const User = require('./models/User');

    if (!token){
        return next(new Error('No token provided'));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        next();

    } catch (error){
        next(new Error('Invalid token'));

    }
});


//This is the socket event handler
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.userId}`);

    socket.join(socket.userId.toString());

   socket.on("send_message", (data) => {
  const { conversationId, senderId, recipientId, text } = data;

  // Broadcast message to recipient instantly
  io.to(recipientId).emit("receive_message", {
    conversationId,
    senderId,
    text,
    createdAt: new Date().toISOString(),
  });

  // Update recipient's inbox instantly
  io.to(recipientId).emit("inbox_update", {
    conversationId,
    lastMessage: text,
    updatedAt: new Date().toISOString(),
  });
});

// --- Seen Message ---
socket.on("message_seen", ({ conversationId, messageId, recipientId }) => {
  io.to(recipientId).emit("message_seen_update", { conversationId, messageId });
});

// --- Typing Indicator ---
socket.on("typing_start", ({ conversationId, recipientId }) => {
  io.to(recipientId).emit("typing_update", { conversationId, typing: true });
});

socket.on("typing_stop", ({ conversationId, recipientId }) => {
  io.to(recipientId).emit("typing_update", { conversationId, typing: false });
});

    socket.on('disconnect', () => {
        console.log(`User disconnnected: ${socket.userId}`);
    });
});


server.listen(PORT, () => {
    console.log(`Chatwave backend running at http://localhost:${PORT}`);
})