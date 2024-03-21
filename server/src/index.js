const express = require("express");
const cors = require("cors");
const session = require('express-session');
const routes = require("./router");

const app = express();

app.use(cors({
  // better way (browsers are now happy)
  origin: (origin, callback) => {
    callback(null, true)
  },
  credentials: true, // authorize cookie
}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));


app.use(express.json({ type: "application/*+json" }));

/* Handle all POST requests with different kind of bodies */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

/* Register all /api routes of differents teams */
app.use("/api", routes);

app.listen(5000, () => {
  console.log("server listening on port 5000");
});

