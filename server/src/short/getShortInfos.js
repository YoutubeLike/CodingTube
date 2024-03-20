const mariadb = require("../src/database");

const getShortInfos = (req, res) => {
  mariadb.pool
    .query(
      "SELECT short.id AS id, title, pseudo, description FROM short JOIN channel ON channel_id = channel.id WHERE short.id = ?;",
      [req.query.shortId]
    )
    .then((value) => {
      res.send(value[0]);
    });
};

const getLikes = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM like_short WHERE id_short = ?;", [req.query.shortId])
    .then((value) => {
      res.send(value);
    });
};

const getDislikes = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM dislike_short WHERE id_short = ?;", [
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const getComments = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM short_comment WHERE short_id = ?;", [
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    });
};

module.exports = {
  getShortInfos,
  getLikes,
  getDislikes,
  getComments,
};
