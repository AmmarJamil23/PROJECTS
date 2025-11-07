const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const uploadRoutes = require('./routes/uploadRoutes');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
    res.send("You meant slash route")
})

app.get('/api/health', (req, res) => {
    res.status(200).json({
        ok: true,
        service: 'ChatWave API',
        time: new Date().toISOString()
    });
});

module.exports = app;