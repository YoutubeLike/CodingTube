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


const submitData = (req, res) => {
  const { title, description} = req.body;
  console.log('Données reçues :', title, description); // Ajoutez cette ligne pour vérifier les données reçues

  mariadb.pool.query('INSERT INTO video (title, description) VALUES (?, ?)', [title, description])
      .then(() => {
          res.status(200).send("Données soumises avec succès !");
      })
      .catch(error => {
          console.error("Erreur lors de la soumission des données :", error);
          res.status(500).send("Une erreur est survenue lors de la soumission des données.");
      });
};


const submit = ((req, res) => {
  const submitValue = req.params.submit;

  console.error("Valeur soumise :", submitValue);
})

// Permet d'exporter les fonctions
module.exports = {
  test,
  selectChannel,
  submit,
  submitData,
};