const express = require('express');
const app = express();
// app.set('port', '8001');
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
app.use(cors())

const io = require('socket.io')(server, {
    cors: {
        origin:['https://damp-spire-04585.herokuapp.com']
    }
})

app.use(express.static('public'));
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
server.listen(process.env.PORT || 8001)
