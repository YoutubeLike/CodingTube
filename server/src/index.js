const express = require("express");
const app = express();
const cors = require("cors");
const mariadb = require("./src/database");
const routes = require("./router");
bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));

app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));

app.use(bodyParser.text({ type: "text/html" }));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
console.log(app);

app.listen(5000, () => {
  console.log("server listening on port 5000");
});

app.use("/api", urlencodedParser, routes);

app.get("/timeline-request/", (req, res) => {
  mariadb.pool
    .query(
      "SELECT channel.pseudo, user.PP, video.* FROM video LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON user.id = channel.user_id ORDER BY video.number_view DESC;"
    )
    .then((value) => {
      res.send(value);
    });
});

// Add a view in video's views count
app.get("/addView-request/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  mariadb.pool
    .query("UPDATE video SET number_view = number_view + 1 WHERE id = ?", [
      videoId,
    ])
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error updating view count:", error);
      res.status(500).send("Error updating view count");
    });
});
