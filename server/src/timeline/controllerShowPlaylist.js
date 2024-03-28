const mariadb = require("../src/database.js");

const showPlaylistRequest = (req, res) => {
  const playlistIdParam = req.query.playlistIdParam;
  // SQL Request : get the video's informations and send it
  mariadb.pool
    .query(
      "SELECT playlist_compo_video.id_video, playlist.id, playlist.nom, user.username, user.PP, video.title, video.description, video.thumbnail, video.upload_date_time, video.number_view, video.video_duration FROM playlist_compo_video LEFT JOIN playlist ON playlist_compo_video.id_playlist = playlist.id LEFT JOIN video ON playlist_compo_video.id_video = video.id LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON channel.user_id = user.id WHERE playlist.id = ?",
      [playlistIdParam]
    )
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error getting playlist's videos from playlistId:", error);
      res.status(500).send("Error getting playlist's videos from playlistId");
    });
};

module.exports = {
  showPlaylistRequest,
};
