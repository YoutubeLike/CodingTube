const mariadb = require("../src/database.js");

const historyRequest = ((req, res) =>  
{
    const userId = req.query.userIdParam;
    mariadb.pool
    .query(
      "SELECT channel.pseudo, user.PP, video.* FROM video LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON user.id = channel.user_id LEFT JOIN watched_video ON watched_video.video_id = video.id WHERE watched_video.user_id = ? GROUP BY watched_video.video_id ORDER BY video.number_view DESC;", [
        userId
      ]
    )
    .then((value) => {
      res.send(value);
    });
})

module.exports = {
    historyRequest,
}