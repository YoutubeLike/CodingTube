const mariadb = require("../src/database.js");

const addViewTimelineRequest = ((req, res) =>  
{
  const videoId = req.query.videoIdParam;
  // SQL Request : change the video's views values with the videoID (the number_view value in SQL musn't be empty)
  mariadb.pool
    .query("UPDATE video SET number_view = number_view + 1 WHERE id = ?", [
      videoId
    ]
  )
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error updating view count:", error);
      res.status(500).send("Error updating view count");
    });
})

module.exports = {
  addViewTimelineRequest,
}