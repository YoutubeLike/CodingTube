const express = require("express");
const app = express();
const cors = require("cors");
const mariadb = require("./src/database");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const bannedWords = ["nigger"];
const bannedWordCounts = {};

io.on("connection", (socket) => {
  console.log("New client connected");
  console.log("Listening for chat-message event"); // Add this line

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
      socket.broadcast.emit("chat-message", {
        sender: msg.sender,
        time: msg.time,
        message: msg.message,
        profilePicture: msg.profilePicture,
      });
    }
    console.log("Message received: " + msg.message);
    console.log("PP of the message received: " + msg.profilePicture);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(cors());

console.log(app);

server.listen(5000, () => {
  console.log("server listening on port 5000");
});

app.get("/profile-picture", async (req, res) => {
  const userId = req.query.userId;
  try {
    const connection = await mariadb.pool.getConnection();
    const result = await connection.query("SELECT pp FROM user WHERE id = ?", [
      userId,
    ]);
    connection.release();
    if (result.length > 0) {
      res.json({ profilePicture: result[0].pp });
    } else {
      res.json({ profilePicture: null });
    }
  } catch (err) {
    console.error(err);
    res.json({ profilePicture: null });
  }
});
app.get("/username", async (req, res) => {
  const userId = req.query.userId;
  try {
    const connection = await mariadb.pool.getConnection();
    const result = await connection.query(
      "SELECT username FROM user WHERE id = ?",
      [userId]
    );
    connection.release();
    if (result.length > 0) {
      res.json({ pseudo: result[0].username });
    } else {
      res.json({ pseudo: null });
    }
  } catch (err) {
    console.error(err);
    res.json({ pseudo: null });
  }
});
