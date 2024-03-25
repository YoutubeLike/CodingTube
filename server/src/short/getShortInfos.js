const mariadb = require("../src/database");

const getTenNextShorts = (req, res) => {
  mariadb.pool.query(
    "SELECT id FROM short WHERE id > ? ORDER BY id ASC LIMIT 10",
    [req.query.currentId]
  ).then((value) => {
    res.send(value);
  });
};

const getShortInfos = (req, res) => {
  mariadb.pool
    .query(
      "SELECT short.id AS id, channel.id AS uploader_id, title, pseudo, description, PP FROM short JOIN channel ON channel_id = channel.id JOIN user ON channel.user_id = user.id WHERE short.id = ?;",
      [req.query.shortId]
    )
    .then((value) => {
      res.send(value[0]);
    });
};

const getShortLikes = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM like_short WHERE id_short = ?;", [req.query.shortId])
    .then((value) => {
      res.send(value);
    });
};

const getShortDislikes = (req, res) => {
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
    .query("SELECT * FROM comment_short WHERE short_id = ? AND reply IS NULL;", [
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const getReplies = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM comment_short WHERE reply = ?;", [
      req.query.replyId,
    ])
    .then((value) => {
      res.send(value);
    });
};

module.exports = {
  getTenNextShorts,
  getShortInfos,
  getShortLikes,
  getShortDislikes,
  getComments,
  getReplies,
};
