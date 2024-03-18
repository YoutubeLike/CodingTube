const mariadb = require("../src/database");

const shortRequest = (req, res) => {
  mariadb.pool
<<<<<<< Updated upstream
    .query("SELECT channel_id, title, upload_video_url, description FROM short")
=======
    .query("SELECT channel_id, title, nb_like description FROM short")
>>>>>>> Stashed changes
    .then((value) => {
      res.send(value[0]);
    });
};

module.exports = {
  shortRequest,
};
