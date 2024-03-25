const mariadb = require("../src/database.js");

const subscriptionListMenu = ((req, res) =>  
{
  // SQL Request : get the video's informations and send it
    mariadb.pool
    .query(
      "SELECT user.PP,channel.pseudo FROM follow LEFT JOIN channel on channel.id = follow.channel_id LEFT JOIN user on user.id = channel.user_id WHERE follower_id = 1;"
    )
    .then((value) => {
      res.send(value);
    });
})

module.exports = {
  subscriptionListMenu,
}