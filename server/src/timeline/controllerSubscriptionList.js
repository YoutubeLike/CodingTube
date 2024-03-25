const mariadb = require("../src/database.js");

const subscriptionList = ((req, res) =>  
{
  const userId = req.session.userId;
  // SQL Request : get the video's informations and send it
    mariadb.pool
    .query(
      "SELECT *, ? as userId FROM follow WHERE follower_id = ?;", [
        userId, userId
      ]
    )
    .then((value) => {
      res.send(value);
    });
})

module.exports = {
  subscriptionList,
}