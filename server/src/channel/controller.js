// Connexion à la Bdd
const mariadb = require('../src/database');

const test = ((_, res) => {
  res.send('Ouai ouai ça dit quoi ?')
});

// Récupérer des infos sur la chaîne
const selectChannel = ((_,res) => {
  mariadb.pool.query('SELECT pseudo, nb_follower, bio FROM channel WHERE user_id = 1').then((value) => {
    res.send(value[0])
  })
})

const submit = ((req, res) => {
  const submitValue = req.params.submit;

  console.error("Valeur soumise :", submitValue);
})

// Récupérer des informations sur la vidéo

const selectVideo = ((_, res) => {
    mariadb.pool.query('SELECT title, description, channel_id, upload_video_url, upload_date_time, number_view, nb_comment, nb_like FROM video WHERE channel_id = 1').then((value) => {
    res.send(value[0]) 
})
})


// Permet d'exporter les fonctions
module.exports = {
  test,
  selectChannel,
  selectVideo,
  submit,
};

















