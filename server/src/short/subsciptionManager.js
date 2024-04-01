const mariadb = require("../src/database");

const getFollow = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM follow WHERE channel_id = ? AND follower_id = ?", [
      req.query.channelId,
      req.session.userId,
    ])
    .then((result) => {
      res.send(result[0]);
    });
};

const follow = (req, res) => {
  if (req.session.userId) {
    mariadb.pool
      .query("SELECT * FROM follow WHERE channel_id = ? AND follower_id = ?", [
        req.query.channelId,
        req.session.userId,
      ])
      .then((result) => {
        if (result[0]) {
          mariadb.pool
            .query(
              "DELETE FROM follow WHERE channel_id = ? AND follower_id = ?",
              [req.query.channelId, req.session.userId]
            )
            .then(() => {
              res.status(200).send("Data deleted sucessfully");
            })
            .catch((error) => {
              console.error("Error while deleting data :", error);
              res.status(500).send("Error while deleting data");
            });
        } else {
          mariadb.pool
            .query(
              "INSERT INTO follow (channel_id, follower_id) VALUES (?, ?)",
              [req.query.channelId, req.session.userId]
            )
            .then(() => {
              res.status(200).send("Data inserted sucessfully");
            })
            .catch((error) => {
              console.error("Error while inserting datas :", error);
              res.status(500).send("Error while inserting datas");
            });
        }
      });
  }
};

module.exports = {
  getFollow,
  follow,
};
