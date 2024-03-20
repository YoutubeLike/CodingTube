const mariadb = require("../src/database");

const addComment = (req, res) => {
  mariadb.pool
    .query(
      "INSERT INTO short_comment (user_id, short_id, text) VALUES (?, ?, ?);",
      [req.query.id, req.query.shortId, req.query.text]
    )
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error updating view count:", error);
      res.status(500).send("Error updating view count");
    });
};

module.exports = {
  addComment,
};
