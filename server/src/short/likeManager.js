const mariadb = require("../src/database");

const checkLike = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM like_short WHERE id_user = ? AND id_short = ?;", [
      req.query.id,
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const addLike = async (req, res) => {
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
        .then((value) => {
          res.send(value);
        })
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

const removeLike = (req, res) => {
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

const checkDislike = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM dislike_short WHERE id_user = ? AND id_short = ?;", [
      req.query.id,
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const addDislike = async (req, res) => {
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
        .then((value) => {
          res.send(value);
        })
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

const removeDislike = (req, res) => {
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
  checkLike,
  addLike,
  removeLike,
  checkDislike,
  addDislike,
  removeDislike,
};
