const mariadb = require("../src/database.js");

const userName = ((req, res) =>  
{
  const userId = req.session.userId;
  // SQL Request : get the video's informations and send it
    mariadb.pool
    .query(
      "SELECT username FROM user WHERE id=?",[
        userId
      ]
    )
    .then((value) => {
      res.send(value);
    });
})

module.exports = {
  userName,
}