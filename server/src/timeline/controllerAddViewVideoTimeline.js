const mariadb = require("../src/database.js");

const addViewTimelineRequest = ((req, res) =>  
{
  // SQL Request : change the video's views values with the videoID (the number_view value in SQL musn't be empty)
  const videoId = req.params.videoId;
  mariadb.pool
    .query("UPDATE video SET number_view = number_view + 1 WHERE id = ?", [
      videoId,
    ])
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error updating view count:", error);
      res.status(500).send("Error updating view count");
    });
})

console.log("router controller add view");

module.exports = {
  addViewTimelineRequest,
}