const mariadb = require("../src/database.js");

const rightSideTimelineRequest = ((req, res) =>  
{
    const videoId = req.query.videoIdParam;
  // SQL Request : get the video's informations and send it
    mariadb.pool
    .query(
      "SELECT channel.pseudo, user.PP, video.* FROM video LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON user.id = channel.user_id WHERE video.id != ? ORDER BY video.number_view DESC;",[
        videoId
    ]
    )
    .then((value) => {
      res.send(value);
    });
})

module.exports = {
    rightSideTimelineRequest,
}