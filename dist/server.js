import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupSocket } from './socket.js';
const app = express();
const server = createServer(app);
const io = new Server(server);
// Serve static files
app.use(express.static('.')); // Serve files from the root directory
// Setup Socket.IO
setupSocket(io);
// Add a route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});
// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');
    // Emit a welcome message to the newly connected client
    socket.emit('serverMessage', 'Welcome to the Socket.IO server!');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
