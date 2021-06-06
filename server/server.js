const express = require('express');
const app = express();
app.set('port', 8001);
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
    cors: {
        origin:['http://localhost:8001']
    }
})

app.use(express.static('public'));
app.use(cors())
server.on('listening', ()=> {
    console.log('Listening on port 8001')
});


io.sockets.on('connection', (socket) => {
    console.log('Client connected: ' + socket.id)
    socket.on('mouse', (data) => {
        socket.broadcast.emit('transmit-mouse', data)
    })
    socket.on('disconnect', () => console.log('Client has disconnected'))
   })
server.listen(8001)