const mariadb = require("../src/database.js");

const playlistRequest = ((req, res) =>  
{
  const videoId = req.params.videoId;
  console.log(videoId);
  mariadb.pool
    .query("SELECT playlist.nom, playlist.id, channel.pseudo, user.PP, video.id AS videoID, video.thumbnail FROM playlist JOIN (SELECT DISTINCT id_playlist FROM playlist_compo_video) unique_playlists ON playlist.id = unique_playlists.id_playlist JOIN playlist_compo_video ON playlist.id = playlist_compo_video.id_playlist JOIN video ON playlist_compo_video.id_video = video.id JOIN channel ON playlist.id_user = channel.user_id JOIN user ON channel.user_id = user.id WHERE video.id = (SELECT MIN(id_video) FROM playlist_compo_video WHERE id_playlist = playlist.id) AND user.id = 1;")
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error updating playlist:", error);
      res.status(500).send("Error updating playlist");
    });
})

console.log("router controller playlist");

module.exports = {
  playlistRequest,
}