const mariadb = require("../src/database.js");

const timelineRequest = ((req, res) =>  
{
  // SQL Request : get the video's informations and send it
    mariadb.pool
    .query(
      "SELECT channel.pseudo, user.PP, video.* FROM video LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON user.id = channel.user_id ORDER BY video.number_view DESC;"
    )
    .then((value) => {
      res.send(value);
    });
})

module.exports = {
    timelineRequest,
}