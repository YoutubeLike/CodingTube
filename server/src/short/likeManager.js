const mariadb = require("../src/database");

const checkShortLike = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM like_short WHERE id_user = ? AND id_short = ?;", [
      req.session.userId,
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const addShortLike = async (req, res) => {
  if (req.session.userId) {
    let checkExistance = await mariadb.pool.query(
      "SELECT * FROM like_short WHERE id_user = ? AND id_short = ?;",
      [req.session.userId, req.query.shortId]
    );

    if (checkExistance[0] == null) {
      let checkExistance = await mariadb.pool.query(
        "SELECT * FROM dislike_short WHERE id_user = ? AND id_short = ?;",
        [req.session.userId, req.query.shortId]
      );

      if (checkExistance[0] == null) {
        mariadb.pool
          .query("INSERT INTO like_short (id_user, id_short) VALUES (?, ?);", [
            req.session.userId,
            req.query.shortId,
          ])
          .then(() => {
            res.status(200).send("Data inserted sucessfully");
          })
          .catch((error) => {
            console.error("Error updating like count:", error);
            res.status(500).send("Error updating like count");
          });
      } else {
        res.send("User already disliked");
      }
    } else {
      res.send("User already liked");
    }
  }
};

const removeShortLike = (req, res) => {
  if (req.session.userId) {
    mariadb.pool
      .query("DELETE FROM like_short WHERE id_user = ? AND id_short = ?;", [
        req.session.userId,
        req.query.shortId,
      ])
      .then(() => {
        res.status(200).send("Data deleted sucessfully");
      })
      .catch((error) => {
        console.error("Error updating like count:", error);
        res.status(500).send("Error updating like count");
      });
  }
};

const checkShortDislike = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM dislike_short WHERE id_user = ? AND id_short = ?;", [
      req.session.userId,
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const addShortDislike = async (req, res) => {
  if (req.session.userId) {
    let checkExistance = await mariadb.pool.query(
      "SELECT * FROM like_short WHERE id_user = ? AND id_short = ?;",
      [req.session.userId, req.query.shortId]
    );

    if (checkExistance[0] == null) {
      let checkExistance = await mariadb.pool.query(
        "SELECT * FROM dislike_short WHERE id_user = ? AND id_short = ?;",
        [req.session.userId, req.query.shortId]
      );

      if (checkExistance[0] == null) {
        mariadb.pool
          .query(
            "INSERT INTO dislike_short (id_user, id_short) VALUES (?, ?);",
            [req.session.userId, req.query.shortId]
          )
          .then(() => {
            res.status(200).send("Data inserted sucessfully");
          })
          .catch((error) => {
            console.error("Error updating dislike count:", error);
            res.status(500).send("Error updating dislike count");
          });
      } else {
        res.send("User already disliked");
      }
    } else {
      res.send("User already liked");
    }
  }
};

const removeShortDislike = (req, res) => {
  if (req.session.userId) {
    mariadb.pool
      .query("DELETE FROM dislike_short WHERE id_user = ? AND id_short = ?;", [
        req.session.userId,
        req.query.shortId,
      ])
      .then(() => {
        res.status(200).send("Data deleted sucessfully");
      })
      .catch((error) => {
        console.error("Error updating dislike count:", error);
        res.status(500).send("Error updating dislike count");
      });
  }
};

module.exports = {
  checkShortLike,
  addShortLike,
  removeShortLike,
  checkShortDislike,
  addShortDislike,
  removeShortDislike,
};
