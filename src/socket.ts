import { Server } from 'socket.io';

export const setupSocket = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        // Handling a message event for bidirectional communication
        socket.on('message', (msg: string) => {
            console.log('Message received: ' + msg);
            // Broadcast the message to all clients
            io.emit('message', msg);
        });

        // Joining a room
        socket.on('joinRoom', (room: string) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
        });

        // Broadcasting a message to a room
        socket.on('messageToRoom', (data: { room: string; msg: string }) => {
            const { room, msg } = data;
            io.to(room).emit('message', msg);
        });
    });
};
