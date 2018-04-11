import app from './app';
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, ()=>{
    console.log('listening to port 3000');
});

// connect and disconnect socket connection based on user login
io.on('connection',(socket) => {
    console.log('user connected');
    socket.on('post', (data) => {
        console.log('post update');
        io.emit('postUpdate',data);
    });
    socket.on('comment', (data) => {
        console.log('comment update');
        io.emit('commentUpdate',data);
    });
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
});
