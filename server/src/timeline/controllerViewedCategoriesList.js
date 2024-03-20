const mariadb = require("../src/database.js");

const viewedCategoriesList = ((req, res) =>  
{
  // SQL Request : get the video's informations and send it
    mariadb.pool
    .query(
      "SELECT category FROM video LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON user.id = channel.user_id LEFT JOIN watched_video ON watched_video.video_id = video.id WHERE watched_video.user_id = 1 GROUP BY watched_video.video_id;"
    )
    .then((value) => {
      res.send(value);
    });
})

module.exports = {
  viewedCategoriesList,
}