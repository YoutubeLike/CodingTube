const mariadb = require("../src/database.js");

const categoryTimelineRequest = (req, res) => {
  const category = req.query.categoryStrParam;
  // SQL Request : get the video's informations and send it
  mariadb.pool
    .query(
      "SELECT channel.pseudo, user.PP, video.* FROM video LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON user.id = channel.user_id WHERE video.category = ? ORDER BY video.number_view DESC;",
      [category]
    )
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error getting categories video:", error);
      res.status(500).send("Error getting categories video");
    });
};

module.exports = {
  categoryTimelineRequest,
};
