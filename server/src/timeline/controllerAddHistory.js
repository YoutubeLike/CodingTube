const mariadb = require("../src/database.js");

const addHistoryRequest = (req, res) => {
  const videoId = req.query.videoIdParam;
  const userId = req.session.userId;

  mariadb.pool
    .query(
      "UPDATE watched_video SET watch_date = CURRENT_TIMESTAMP WHERE video_id = ? AND user_id = ?",
      [videoId, userId]
    )
    .then((result) => {
      if (result.affectedRows === 0) {
        return mariadb.pool.query(
          "INSERT INTO watched_video (video_id, user_id, watch_date) VALUES (?, ?, CURRENT_TIMESTAMP)",
          [videoId, userId]
        );
      }
    })
    .then(() => {
      res.send("History updated successfully");
    })
    .catch((error) => {
      console.error("Error updating history:", error);
    });
};

console.log("router controller history");

module.exports = {
  addHistoryRequest,
};
