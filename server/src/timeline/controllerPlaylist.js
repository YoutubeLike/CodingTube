const mariadb = require("../src/database.js");

const playlistRequest = (req, res) => {
  const userId = req.session.userId;

  mariadb.pool
    .query(
      "SELECT playlist.nom, playlist.id, user.username, user.PP, video.id AS videoID, video.thumbnail FROM playlist JOIN (SELECT DISTINCT id_playlist FROM playlist_compo_video) unique_playlists ON playlist.id = unique_playlists.id_playlist JOIN playlist_compo_video ON playlist.id = playlist_compo_video.id_playlist JOIN video ON playlist_compo_video.id_video = video.id  JOIN user ON playlist.id_user= user.id WHERE video.id = (SELECT MIN(id_video) FROM playlist_compo_video WHERE id_playlist = playlist.id) AND user.id =?;",
      [userId]
    )
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error getting playlists from userId:", error);
      res.status(500).send("Error getting playlist from userId");
    });
};

module.exports = {
  playlistRequest,
};
