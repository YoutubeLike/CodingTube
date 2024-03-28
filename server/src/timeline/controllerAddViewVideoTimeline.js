const mariadb = require("../src/database.js");

const addViewTimelineRequest = (req, res) => {
  const videoId = req.query.videoIdParam;
  // SQL Request : add one view of a video with the videoId parameter. The history is added to another file (controllerAddHistory), the userId is used there.
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
};

module.exports = {
  addViewTimelineRequest,
};
