const mariadb = require("../src/database.js");

const addHistoryRequest = ((req, res) =>  
{
  const userId = req.query.userIdParam;
  const videoId = req.query.videoIdParam;
  console.log(videoId);
  mariadb.pool
    .query("INSERT INTO watched_video (video_id, user_id, watch_date) VALUES (?, ?, CURRENT_TIMESTAMP)", [
      videoId, userId
    ])
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error updating history:", error);
      res.status(500).send("Error updating history");
    });
})

console.log("router controller history");

module.exports = {
  addHistoryRequest,
}