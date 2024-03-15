const express = require("express");
const app = express();
const cors = require("cors");
const mariadb = require("./src/database");
const routes = require("./router");
bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));


app.use(bodyParser.text({ type: "text/html" }));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
console.log(app);

app.listen(5000, () => {
  console.log("server listening on port 5000");
});

app.use("/api", urlencodedParser, routes);

