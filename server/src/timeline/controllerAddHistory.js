const mariadb = require("../src/database.js");

const addHistoryRequest = ((req, res) =>  
{
  const videoId = req.params.videoId;
  console.log(videoId);
  mariadb.pool
    .query("INSERT INTO watched_video (video_id, user_id, watch_date) VALUES (?, 1, CURRENT_TIMESTAMP)", [
      videoId,
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