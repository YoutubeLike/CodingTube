const mariadb = require("../src/database.js");

const subscriptionList = ((req, res) =>  
{
  // SQL Request : get the video's informations and send it
    mariadb.pool
    .query(
      "SELECT * FROM follow WHERE follower_id = 1;"
    )
    .then((value) => {
      res.send(value);
    });
})

module.exports = {
  subscriptionList,
}