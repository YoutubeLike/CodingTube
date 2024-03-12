const express = require('express');
const app = express();
const cors = require('cors');
const mariadb = require('./src/database');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server, {
    cors : {
        origin : "*"
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');
  
    // Handle chat messages
    socket.on('chat-message', (msg) => {
      io.emit('chat-message', msg);
    });
    io.emit("test", "When the chat is lit")
  
    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  

app.use(cors())

console.log(app)

server.listen(5000, () => {
      console.log('server listening on port 5000')
})

app.get('/', (req, res) => {
    res.send("caca");
    io.emit("test", "When the chat is lit")
  });
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  });

// app.get('/', (req, res) => {
//     mariadb.pool.query("SELECT * FROM user").then((value) => {
//         //res.send(value[0]["username"])
//         socket;
//     })
// })

