const mariadb = require("../src/database.js");

const subscriptionList = ((req, res) =>  
{
  const userId = req.session.userId;
  // SQL Request : get the video's informations and send it
    mariadb.pool
    .query(
      "SELECT * FROM follow WHERE follower_id = ?;", [
        userId
      ]
    )
    .then((value) => {
      res.send(value);
    });
})

module.exports = {
  subscriptionList,
}