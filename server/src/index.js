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
console.log(app);

const io = new socketio.Server(server, {
  cors: {
    origin: "*",
  },
})

io.on('connection', (socket) => 
{
  console.log('user conenctect');
  socket.on('send', () => {
     io.emit("chat-message")
  })

})






app.use("/api", urlencodedParser, routes);

server.listen(5000, () => {
  console.log("server listening on port 5000");
});