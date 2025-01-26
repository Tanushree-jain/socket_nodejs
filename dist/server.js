import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupSocket } from './socket.js'; // Updated to include .js extension
const app = express();
const server = createServer(app);
const io = new Server(server);
// Setup Socket.IO
setupSocket(io);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
