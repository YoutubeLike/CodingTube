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

const submit = (req, res) => {  
  const { name, identifier, bio } = req.body
  mariadb.pool.query("INSERT INTO channel (user_id, pseudo, identifier_channel, nb_follower, bio) VALUES (1, ?, ?, 0, ?)", [name, identifier, bio])
    .then(() => {
      res.status(200).send('Chaîne créer')
    })
}

// Permet d'exporter les fonctions
module.exports = {
  test,
  selectChannel,
  submit,
};

















