export const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
        // Handling a message event for bidirectional communication
        socket.on('clientMessage', (msg) => {
            console.log('Message received: ' + msg);
            // Emit the message back to all clients
            io.emit('clientMessage', msg);
        });
        socket.on('serverMessage', (msg) => {
            console.log('Message received: ' + msg);
            // Emit the message back to all clients
            io.emit('serverMessage', msg);
        });
        // Joining a room
        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
        });
        // Broadcasting a message to a room
        socket.on('messageToRoom', (data) => {
            const { room, msg } = data;
            io.to(room).emit('message', msg);
        });
    });
};
