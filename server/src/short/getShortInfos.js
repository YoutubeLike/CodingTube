const mariadb = require("../src/database");

const getShortsList = (req, res) => {
  mariadb.pool.query("SELECT id FROM short ORDER BY id DESC").then((value) => {
    res.send(value);
  });
};

const getShortInfos = (req, res) => {
  mariadb.pool
    .query(
      "SELECT short.id AS id, title, pseudo, description, PP FROM short JOIN channel ON channel_id = channel.id JOIN user ON channel.user_id = user.id WHERE short.id = ?;",
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
    .query("SELECT * FROM comment_short WHERE short_id = ?;", [
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    });
};

module.exports = {
  getShortsList,
  getShortInfos,
  getLikes,
  getDislikes,
  getComments,
};
