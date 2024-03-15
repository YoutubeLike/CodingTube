const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("build"));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("send message", (msg) => {
    io.emit("message", msg);
  });
});

http.listen(3001, () => {
  console.log("listening on *:3001");
});
