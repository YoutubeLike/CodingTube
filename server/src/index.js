const express = require("express");
const app = express();
const cors = require("cors");
const mariadb = require("./src/database");
const routes = require("./router");
const session = require('express-session');

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.get('/', (req, res) => {
  const sessionData = req.session;
});

app.use(cors());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.raw({ type: "application/vnd.custom-type" }));


app.use(express.text({ type: "text/html" }));


app.listen(5000, () => {
  console.log("server listening on port 5000");
});

app.use("/api", routes);

module.exports.app = app