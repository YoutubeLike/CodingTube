const mariadb = require("../src/database");

const addCommentAndGetId = (req, res) => {
  if (req.session.userId) {
    mariadb.pool
      .query(
        "INSERT INTO comment_short (user_id, short_id, text, comment_date) VALUES (?, ?, ?, CURRENT_TIMESTAMP);",
        [req.session.userId, req.query.shortId, req.query.text]
      )
      .then(() => {
        mariadb.pool
          .query(
            "SELECT id FROM comment_short WHERE text = ? ORDER BY comment_date DESC;",
            [req.query.text]
          )
          .then((value) => {
            res.send(value[0]);
          });
      })
      .catch((error) => {
        console.error("Error inserting comment:", error);
        res.status(500).send("Error inserting comment");
      });
  }
};

const addReplyAndGetId = (req, res) => {
  if (req.session.userId) {
    mariadb.pool
      .query(
        "INSERT INTO comment_short (user_id, short_id, text, reply, comment_date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);",
        [
          req.session.userId,
          req.query.shortId,
          req.query.text,
          req.query.replyId,
        ]
      )
      .then(() => {
        mariadb.pool
          .query(
            "SELECT id FROM comment_short WHERE text = ? ORDER BY comment_date DESC;",
            [req.query.text]
          )
          .then((value) => {
            res.send(value[0]);
          });
      })
      .catch((error) => {
        console.error("Error inserting comment:", error);
        res.status(500).send("Error inserting comment");
      });
  }
};

const getCommentInfos = (req, res) => {
  mariadb.pool
    .query(
      "SELECT text, comment_date, username, PP FROM comment_short JOIN user ON user_id = user.id WHERE comment_short.id = ?;",
      [req.query.commentId]
    )
    .then((value) => {
      res.send(value[0]);
    });
};

const getCommentLikes = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM like_short_comment WHERE id_comment = ?;", [
      req.query.commentId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const getCommentDislikes = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM dislike_short_comment WHERE id_comment = ?;", [
      req.query.commentId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const checkShortCommentLike = (req, res) => {
  mariadb.pool
    .query(
      "SELECT * FROM like_short_comment WHERE id_user = ? AND id_comment = ?;",
      [req.session.userId, req.query.commentId]
    )
    .then((value) => {
      res.send(value);
    });
};

const checkShortCommentSuperlike = (req, res) => {
  mariadb.pool
    .query(
      "SELECT * FROM like_short_comment WHERE id_user = ? AND id_comment = ?;",
      [req.query.userId, req.query.commentId]
    )
    .then((value) => {
      res.send(value);
    });
};

const addShortCommentLike = async (req, res) => {
  let checkExistance = await mariadb.pool.query(
    "SELECT * FROM like_short_comment WHERE id_user = ? AND id_comment = ?;",
    [req.session.userId, req.query.commentId]
  );

  if (checkExistance[0] == null) {
    let checkExistance = await mariadb.pool.query(
      "SELECT * FROM dislike_short_comment WHERE id_user = ? AND id_comment = ?;",
      [req.session.userId, req.query.commentId]
    );

    if (checkExistance[0] == null) {
      mariadb.pool
        .query(
          "INSERT INTO like_short_comment (id_user, id_comment) VALUES (?, ?);",
          [req.session.userId, req.query.commentId]
        )
        .then(() => {
          res.status(200).send("Data inserted sucessfully");
        })
        .catch((error) => {
          console.error("Error inserting like:", error);
          res.status(500).send("Error inserting like");
        });
    } else {
      res.send("User already disliked");
    }
  } else {
    res.send("User already liked");
  }
};

const removeShortCommentLike = (req, res) => {
  mariadb.pool
    .query(
      "DELETE FROM like_short_comment WHERE id_user = ? AND id_comment = ?;",
      [req.session.userId, req.query.commentId]
    )
    .then(() => {
      res.status(200).send("Data deleted sucessfully");
    })
    .catch((error) => {
      console.error("Error removing like:", error);
      res.status(500).send("Error removing like");
    });
};

const checkShortCommentDislike = (req, res) => {
  mariadb.pool
    .query(
      "SELECT * FROM dislike_short_comment WHERE id_user = ? AND id_comment = ?;",
      [req.session.userId, req.query.commentId]
    )
    .then((value) => {
      res.send(value);
    });
};

const addShortCommentDislike = async (req, res) => {
  let checkExistance = await mariadb.pool.query(
    "SELECT * FROM like_short_comment WHERE id_user = ? AND id_comment = ?;",
    [req.session.userId, req.query.commentId]
  );

  if (checkExistance[0] == null) {
    let checkExistance = await mariadb.pool.query(
      "SELECT * FROM dislike_short_comment WHERE id_user = ? AND id_comment = ?;",
      [req.session.userId, req.query.commentId]
    );

    if (checkExistance[0] == null) {
      mariadb.pool
        .query(
          "INSERT INTO dislike_short_comment (id_user, id_comment) VALUES (?, ?);",
          [req.session.userId, req.query.commentId]
        )
        .then(() => {
          res.status(200).send("Data inserted sucessfully");
        })
        .catch((error) => {
          console.error("Error inserting dislike:", error);
          res.status(500).send("Error inserting dislike");
        });
    } else {
      res.send("User already disliked");
    }
  } else {
    res.send("User already liked");
  }
};

const removeShortCommentDislike = (req, res) => {
  mariadb.pool
    .query(
      "DELETE FROM dislike_short_comment WHERE id_user = ? AND id_comment = ?;",
      [req.session.userId, req.query.commentId]
    )
    .then(() => {
      res.status(200).send("Data deleted sucessfully");
    })
    .catch((error) => {
      console.error("Error removing dislike:", error);
      res.status(500).send("Error removing dislike");
    });
};

module.exports = {
  addCommentAndGetId,
  addReplyAndGetId,
  getCommentInfos,
  getCommentLikes,
  getCommentDislikes,
  checkShortCommentLike,
  checkShortCommentSuperlike,
  addShortCommentLike,
  removeShortCommentLike,
  checkShortCommentDislike,
  addShortCommentDislike,
  removeShortCommentDislike,
};
