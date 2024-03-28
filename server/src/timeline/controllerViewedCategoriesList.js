const mariadb = require("../src/database.js");

const viewedCategoriesList = (req, res) => {
  const userId = req.session.userId;
  // SQL Request : get the video's informations and send it
  mariadb.pool
    .query(
      "SELECT category FROM video LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON user.id = channel.user_id LEFT JOIN watched_video ON watched_video.video_id = video.id WHERE watched_video.user_id = ? GROUP BY watched_video.video_id;",
      [userId]
    )
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error getting the viewed categories list by userId:", error);
      res.status(500).send("Error getting the viewed categories list by userId");
    });
};

module.exports = {
  viewedCategoriesList,
};
