const mariadb = require("../src/database");

const getVideoLikes = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM like_video WHERE id_video = ?;", [req.query.videoId])
    .then((value) => {
      res.send(value);
    });
};

const getVideoDislikes = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM dislike_video WHERE id_video = ?;", [
      req.query.videoId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const checkVideoLike = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM like_video WHERE id_user = ? AND id_video = ?;", [
      req.session.userId,
      req.query.videoId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const addVideoLike = async (req, res) => {
  let checkExistance = await mariadb.pool.query(
    "SELECT * FROM like_video WHERE id_user = ? AND id_video = ?;",
    [req.session.userId, req.query.videoId]
  );

  if (checkExistance[0] == null) {
    let checkExistance = await mariadb.pool.query(
      "SELECT * FROM dislike_video WHERE id_user = ? AND id_video = ?;",
      [req.session.userId, req.query.videoId]
    );

    if (checkExistance[0] == null) {
      mariadb.pool
        .query("INSERT INTO like_video (id_user, id_video) VALUES (?, ?);", [
          req.session.userId,
          req.query.videoId,
        ])
        .catch((error) => {
          console.error("Error updating view count:", error);
          res.status(500).send("Error updating view count");
        });
    } else {
      res.send("User already disliked");
    }
  } else {
    res.send("User already liked");
  }
};

const removeVideoLike = (req, res) => {
  mariadb.pool
    .query("DELETE FROM like_video WHERE id_user = ? AND id_video = ?;", [
      req.session.userId,
      req.query.videoId,
    ])
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error updating view count:", error);
      res.status(500).send("Error updating view count");
    });
};

const checkVideoDislike = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM dislike_video WHERE id_user = ? AND id_video = ?;", [
      req.session.userId,
      req.query.videoId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const addVideoDislike = async (req, res) => {
  let checkExistance = await mariadb.pool.query(
    "SELECT * FROM like_video WHERE id_user = ? AND id_video = ?;",
    [req.session.userId, req.query.videoId]
  );

  if (checkExistance[0] == null) {
    let checkExistance = await mariadb.pool.query(
      "SELECT * FROM dislike_video WHERE id_user = ? AND id_video = ?;",
      [req.session.userId, req.query.videoId]
    );

    if (checkExistance[0] == null) {
      mariadb.pool
        .query("INSERT INTO dislike_video (id_user, id_video) VALUES (?, ?);", [
          req.session.userId,
          req.query.videoId,
        ])
        .catch((error) => {
          console.error("Error updating view count:", error);
          res.status(500).send("Error updating view count");
        });
    } else {
      res.send("User already disliked");
    }
  } else {
    res.send("User already liked");
  }
};

const removeVideoDislike = (req, res) => {
  mariadb.pool
    .query("DELETE FROM dislike_video WHERE id_user = ? AND id_video = ?;", [
      req.session.userId,
      req.query.videoId,
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
  getVideoLikes,
  getVideoDislikes,
  checkVideoLike,
  addVideoLike,
  removeVideoLike,
  checkVideoDislike,
  addVideoDislike,
  removeVideoDislike,
};
