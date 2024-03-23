const mariadb = require("../src/database");

const checkShortLike = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM like_short WHERE id_user = ? AND id_short = ?;", [
      req.query.id,
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const addShortLike = async (req, res) => {
  let checkExistance = await mariadb.pool.query(
    "SELECT * FROM like_short WHERE id_user = ? AND id_short = ?;",
    [req.query.id, req.query.shortId]
  );

  if (checkExistance[0] == null) {
    let checkExistance = await mariadb.pool.query(
      "SELECT * FROM dislike_short WHERE id_user = ? AND id_short = ?;",
      [req.query.id, req.query.shortId]
    );

    if (checkExistance[0] == null) {
      mariadb.pool
        .query("INSERT INTO like_short (id_user, id_short) VALUES (?, ?);", [
          req.query.id,
          req.query.shortId,
        ])
        .catch((error) => {
          console.error("Error updating view count:", error);
          res.status(500).send("Error updating view count");
        });
    }
    else {
      res.send("User already disliked");
    }
  }
  else {
    res.send("User already liked");
  }
};

const removeShortLike = (req, res) => {
  mariadb.pool
    .query("DELETE FROM like_short WHERE id_user = ? AND id_short = ?;", [
      req.query.id,
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error updating view count:", error);
      res.status(500).send("Error updating view count");
    });
};

const checkShortDislike = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM dislike_short WHERE id_user = ? AND id_short = ?;", [
      req.query.id,
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const addShortDislike = async (req, res) => {
  let checkExistance = await mariadb.pool.query(
    "SELECT * FROM like_short WHERE id_user = ? AND id_short = ?;",
    [req.query.id, req.query.shortId]
  );

  if (checkExistance[0] == null) {
    let checkExistance = await mariadb.pool.query(
      "SELECT * FROM dislike_short WHERE id_user = ? AND id_short = ?;",
      [req.query.id, req.query.shortId]
    );

    if (checkExistance[0] == null) {
      mariadb.pool
        .query("INSERT INTO dislike_short (id_user, id_short) VALUES (?, ?);", [
          req.query.id,
          req.query.shortId,
        ])
        .catch((error) => {
          console.error("Error updating view count:", error);
          res.status(500).send("Error updating view count");
        });
    }
    else {
      res.send("User already disliked");
    }
  }
  else {
    res.send("User already liked");
  }
};

const removeShortDislike = (req, res) => {
  mariadb.pool
    .query("DELETE FROM dislike_short WHERE id_user = ? AND id_short = ?;", [
      req.query.id,
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error updating view count:", error);
      res.status(500).send("Error updating view count");
    });
};

module.exports = {
  checkShortLike,
  addShortLike,
  removeShortLike,
  checkShortDislike,
  addShortDislike,
  removeShortDislike,
};
