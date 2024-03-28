const express = require("express");
const cors = require("cors");
const mariadb = require("./src/database");
bodyParser = require("body-parser");
const { createServer } = require("http");
const app = express();
const server = createServer(app);
const socketio = require("socket.io");
const session = require("express-session");
const routes = require("./router");
const axios = require("axios");
const {
  // Importing functions from authentication module
  InsertUser,
  CheckIfMailExist,
  CheckIfUsernameExist,
  GetUserId,
  CheckIfDiscordAccount,
  ModifyDiscordStatus,
  InsertDiscordUser,
} = require("./profil/authentication");

app.use(
  cors({
    // better way (browsers are now happy)
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true, // authorize cookie
  })
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

/* Handle all POST requests with different kind of bodies */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

/* Register all /api routes of differents teams */
app.use("/api", routes);

const io = new socketio.Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
});

const bannedWords = ["nigger"];
const bannedWordCounts = {};

io.on("connection", (socket) => {
  console.log("New client connected");
  console.log("Listening for chat-message event"); // Add this line

  //WIDGET

  socket.on("send", () => {
    io.emit("widget-message");
  });

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
      const room = socket.rooms.values();
      room.next();
      socket.broadcast.to(room.next().value).emit("chat-message", {
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

  console.log(io.engine.clientsCount);
  console.log(socket.rooms);

  socket.on("connect-to-room", (arg) => {
    socket.join(arg);
  });
});

server.listen(5000, () => {
  console.log("server listening on port 5000");
});

app.get("/loginDiscord", async (req, res) => {
  const code = req.query.code;
  const params = new URLSearchParams();
  let user;
  params.append("client_id", "1222106872736383056");
  params.append("client_secret", "bkyWreCY214vBAi8SPwGSgvwa5pvndA6");
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:5000/loginDiscord");
  try {
    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      params
    );
    const { access_token, token_type } = response.data;
    const userDataResponse = await axios.get(
      "https://discord.com/api/users/@me",
      {
        headers: {
          authorization: `${token_type} ${access_token}`,
        },
      }
    );
    console.log("Data: ", userDataResponse.data);
    user = {
      username: userDataResponse.data.username,
      email: userDataResponse.data.email,
    };
    const emailExist = await CheckIfMailExist(user.email);
    const usernameExist = await CheckIfUsernameExist(user.username);
    const discordAccount = await CheckIfDiscordAccount(user.email);


    if (emailExist) {
      if (discordAccount) {
        ModifyDiscordStatus(user.email);
      }
      const userId = await GetUserId(user.email);
      req.session.userId = userId;
      req.session.save();
      res.cookie("CodingTube", req.session, { sameSite: "none", secure: true });
    } else {
      if (usernameExist) {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        
        InsertDiscordUser(user.username + "#" +randomNumber, user.email);
      } else {
        InsertDiscordUser(user.username, user.email);
      }
      const userId = await GetUserId(user.email);
      req.session.userId = userId;
      req.session.save();
      res.cookie("CodingTube", req.session, { sameSite: "none", secure: true });
    }

    
    return res.redirect(`http://localhost:3000`);
      
  } catch (error) {
    console.log("Error", error);
    return res.send("Some error occurred! ");
  }
});
