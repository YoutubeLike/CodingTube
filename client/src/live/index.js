// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mariadb = require("./src/database");
// const { createServer } = require("node:http");
// const { Server } = require("socket.io");
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// const bannedWords = ["nigger"];
// const bannedWordCounts = {};

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   console.log("Listening for chat-message event"); // Add this line

//   // Handle chat messages
//   socket.on("chat-message", async (msg) => {
//     console.log(
//       `Received message from ${socket.handshake.query.userId}: ${msg.message}`
//     );
//     const bannedWordFound = bannedWords.some((word) =>
//       msg.message.toLowerCase().includes(word)
//     );
//     if (bannedWordFound) {
//       const userId = socket.handshake.query.userId;
//       if (bannedWordCounts[userId]) {
//         bannedWordCounts[userId]++;
//       } else {
//         bannedWordCounts[userId] = 1;
//       }
//       if (bannedWordCounts[userId] >= 3) {
//         // Ban the user for 1 minute
//         socket.emit("ban-message", { banned: true });
//         bannedWordCounts[userId] = 0;
//       } else {
//         console.log(
//           `User ${userId} said a banned word for the ${bannedWordCounts[userId]}th time`
//         );
//       }
//     } else {
//       // Broadcast the message to all connected clients except the sender
//       console.log(msg.time);
//       socket.broadcast.emit("chat-message", {
//         sender: msg.sender,
//         time: msg.time,
//         message: msg.message,
//       });
//     }
//     console.log("Message received: " + msg.message);
//   });

//   // Handle disconnections
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// app.use(cors());

// console.log(app);

// server.listen(5000, () => {
//   console.log("server listening on port 5000");
// });

// app.get("/", (req, res) => {
//   res.send("caca");
// });
