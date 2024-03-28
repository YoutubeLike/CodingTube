const mariadb = require("../src/database.js");

const playlistInfosRequest = ((req, res) =>  
{
  const playlistId = req.query.playlistIdParam;

  mariadb.pool
    .query("SELECT playlist.id_user, playlist.nom, video.thumbnail FROM playlist LEFT JOIN playlist_compo_video ON playlist_compo_video.id_playlist = playlist.id LEFT JOIN video ON video.id = playlist_compo_video.id_video WHERE playlist.id = ? LIMIT 1;", [
      playlistId
    ])
    .then((value) => {
      res.send(value);
    });
})

module.exports = {
  playlistInfosRequest,
}