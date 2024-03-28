const mariadb = require("../src/database.js");

const userInfo = (req, res) => {
  const userId = req.session.userId;
  // SQL Request : get the video's informations and send it
  mariadb.pool
    .query("SELECT PP, username from user WHERE id=?", [userId])
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error getting profile picture, and username by userId:", error);
      res.status(500).send("Error getting profile picture, and username by userId");
    });
};

module.exports = {
  userInfo,
};
