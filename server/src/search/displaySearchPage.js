const mariadb = require("../src/database.js");

const displaySearchPage = ((req, res) =>  
{
    const inputSearch = req.params.researchInput;
  // SQL Request : get the video's informations and send it
  try{
   const results = mariadb.pool.query(
      "SELECT channel.pseudo, user.PP, video.* FROM video LEFT JOIN channel ON video.channel_id = channel.id LEFT JOIN user ON user.id = channel.user_id WHERE title LIKE ? ORDER BY video.number_view DESC;"['%' + inputSearch + '%'])
    res.status(200).send(results); 
} catch (error){
    res.status(500).send("Une erreur est survenue lors du chargement des vidéos");
}
})
module.exports = {
    displaySearchPage
}
