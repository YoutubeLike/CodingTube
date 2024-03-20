const mariadb = require("../src/database");

const getShortInfos = (req, res) => {
  mariadb.pool
    .query(
      "SELECT short.id AS id, title, nb_comment, pseudo, description FROM short JOIN channel ON channel_id = channel.id WHERE short.id = ?;",
      [req.query.shortId]
    )
    .then((value) => {
      res.send(value[0]);
    });
};

module.exports = {
  getShortInfos,
};
