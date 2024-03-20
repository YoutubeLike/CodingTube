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
  console.log("Listening for chat-message event");

  // Handle chat messages
  socket.on("chat-message", async (msg) => {
    console.log(
      `Received message from ${socket.handshake.query.userId}: ${msg.message}`
    );

    const userDataQuery = `SELECT username, pp FROM user WHERE id = ?`;
    try {
      const connection = await mariadb.pool.getConnection();
      const userDataResult = await connection.query(userDataQuery, [
        socket.handshake.query.userId,
      ]);
      connection.release();

      // Handle banned words and apply appropriate actions

      // Broadcast the message if no banned words found
      if (!bannedWordFound) {
        const senderProfilePicture = userDataResult[0].pp;
        const senderUsername = userDataResult[0].username;

        io.emit("chat-message", {
          sender: senderUsername,
          time: msg.time,
          message: msg.message,
          profilePicture: senderProfilePicture,
        });

        console.log("Message broadcasted: ", msg.message);
      }
    } catch (err) {
      console.error(err);
    }
  }); // Handle disconnections
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  async function getProfilePicture(userId) {
    try {
      const connection = await mariadb.pool.getConnection();
      const result = await connection.query(
        "SELECT pp FROM user WHERE id = ?",
        [userId]
      );
      connection.release();
      if (result.length > 0) {
        return result[0].pp;
      } else {
        console.log("No profile picture found for user ID:", userId);
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }
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
