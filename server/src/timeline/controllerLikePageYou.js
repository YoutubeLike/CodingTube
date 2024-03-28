const mariadb = require("../src/database.js");

const likePageYouRequest = (req, res) => {
  const userId = req.session.userId;
  mariadb.pool
    .query(
      "SELECT channel.pseudo, user.PP, video.* FROM video LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON user.id = channel.user_id LEFT JOIN like_video ON like_video.id_video = video.id WHERE like_video.id_user = ? ORDER BY like_video.id DESC;",
      [userId]
    )
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error getting liked videos by userId:", error);
      res.status(500).send("Error getting liked videos by userId");
    });
};

module.exports = {
  likePageYouRequest,
};
