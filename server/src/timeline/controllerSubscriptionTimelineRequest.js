const mariadb = require("../src/database.js");

const subscriptionTimelineRequest = ((req, res) =>  
{
  const userId = req.query.userIdParam;
  // SQL Request : get the video's informations and send it
    mariadb.pool
    .query(
      "SELECT channel.pseudo, user.PP, video.* FROM video LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON user.id = channel.user_id LEFT JOIN follow ON channel.id = follow.channel_id WHERE follow.follower_id = ? ORDER BY video.upload_date_time DESC;", [
        userId
      ]
    )
    .then((value) => {
      res.send(value);
    });
})

module.exports = {
  subscriptionTimelineRequest,
}