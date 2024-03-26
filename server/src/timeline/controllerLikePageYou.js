const mariadb = require("../src/database.js");

const likePageYouRequest = ((req, res) =>  
{
    mariadb.pool
    .query(
      "SELECT channel.pseudo, user.PP, video.* FROM video LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON user.id = channel.user_id LEFT JOIN like_video ON like_video.id_video = video.id WHERE like_video.id_user = 1 ORDER BY like_video.id DESC;"
    )
    .then((value) => {
      res.send(value);
    });
})

module.exports = {
    likePageYouRequest,
}