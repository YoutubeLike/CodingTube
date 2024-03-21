const express = require("express");
const app = express();
const cors = require("cors");
const mariadb = require("./src/database");
const routes = require("./router");
bodyParser = require("body-parser");
const { createServer } = require('http')
const server = createServer(app)
const socketio = require('socket.io');

app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));

app.use(bodyParser.text({ type: "text/html" }));
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const io = new socketio.Server(server, {
  cors: {
    origin: "*",
  },
})

const bannedWords = ["nigger"];
const bannedWordCounts = {};

io.on("connection", (socket) => {
  console.log("New client connected");
  console.log("Listening for chat-message event"); // Add this line

  //WIDGET
  
  socket.on('send', () => {
     io.emit("widget-message")
  })
  
  //WIDGET 
  // Handle chat messages
  socket.on("chat-message", async (msg) => {
    console.log(
      `Received message from ${socket.handshake.query.userId}: ${msg.message}`
    );
    const bannedWordFound = bannedWords.some((word) =>
      msg.message.toLowerCase().includes(word)
    );
    if (bannedWordFound) {
      const userId = socket.handshake.query.userId;
      if (bannedWordCounts[userId]) {
        bannedWordCounts[userId]++;
      } else {
        bannedWordCounts[userId] = 1;
      }
      if (bannedWordCounts[userId] >= 3) {
        // Ban the user for 1 minute
        socket.emit("ban-message", { banned: true });
        bannedWordCounts[userId] = 0;
      } else {
        console.log(
          `User ${userId} said a banned word for the ${bannedWordCounts[userId]}th time`
        );
      }
    } else {
      const room = socket.rooms.values()
      room.next();
      socket.broadcast.to(room.next().value).emit("chat-message", {
        sender: msg.sender,
        time: msg.time,
        message: msg.message,
        profilePicture: msg.profilePicture,
      });

      // socket.broadcast.emit("chat-message", {
      //   sender: msg.sender,
      //   time: msg.time,
      //   message: msg.message,
      //   profilePicture: msg.profilePicture,
      // });
    }
    console.log("Message received: " + msg.message);
    console.log("PP of the message received: " + msg.profilePicture);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  console.log(io.engine.clientsCount)
  console.log(socket.rooms)

  socket.on("connect-to-room", (arg) => {
    socket.join(arg)
  })
});




app.use("/api", urlencodedParser, routes);

server.listen(5000, () => {
  console.log("server listening on port 5000");
});