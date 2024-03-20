const mariadb = require("../src/database");

const shortRequest = (req, res) => {
  mariadb.pool
    .query(
      "SELECT short.id AS id, title, nb_like, nb_dislike, nb_comment, pseudo, description FROM short JOIN channel ON channel_id = channel.id WHERE short.id = ?;",
      [req.query.shortId]
    )
    .then((value) => {
      res.send(value[0]);
    });
};

const getLikes = (req, res) => {
  mariadb.pool
    .query("SELECT nb_like FROM short WHERE short.id = ?;", [req.query.shortId])
    .then((value) => {
      res.send(value[0]);
    });
};

const updateLike = (req) => {
  mariadb.pool.query("UPDATE short SET nb_like = ? WHERE id = ?", [
    req.query.updatedLikes,
    req.query.shortId,
  ]);
};

const getDislikes = (req, res) => {
  mariadb.pool
    .query("SELECT nb_dislike FROM short WHERE short.id = ?;", [
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value[0]);
    });
};

const updateDislike = (req) => {
  mariadb.pool.query("UPDATE short SET nb_dislike = ? WHERE id = ?", [
    req.query.updatedDislikes,
    req.query.shortId,
  ]);
};

module.exports = {
  shortRequest,
  getLikes,
  updateLike,
  getDislikes,
  updateDislike,
};
