const mariadb = require("../src/database.js");

const timelineRequest = ((req, res) =>  
{
    mariadb.pool
    .query(
      "SELECT channel.pseudo, user.PP, video.* FROM video LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON user.id = channel.user_id ORDER BY video.number_view DESC;"
    )
    .then((value) => {
      res.send(value);
    });
})

console.log("router controller");

module.exports = {
    timelineRequest,
}