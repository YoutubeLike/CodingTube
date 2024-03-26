const mariadb = require("../src/database");

const getFollow = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM follow WHERE channel_id = ? AND follower_id = ?", [
      req.query.channelId,
      req.query.userId,
    ])
    .then((result) => {
      res.send(result[0]);
    });
};
// ABONNEMENT //
// Ajout ou enlèvement d'un abonnement
const follow = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM follow WHERE channel_id = ? AND follower_id = ?", [
      req.query.channelId,
      req.query.userId,
    ])
    .then((result) => {
      if (result[0]) {
        mariadb.pool
          .query(
            "DELETE FROM follow WHERE channel_id = ? AND follower_id = ?",
            [req.query.channelId, req.query.userId]
          )
          .then(() => {
            res.status(200).send("Données supprimées avec succès !");
          })
          .catch((error) => {
            console.error("Erreur lors de la soumission des données :", error);
            res
              .status(500)
              .send(
                "Une erreur est survenue lors de la soumission des données."
              );
          });
      } else {
        mariadb.pool
          .query("INSERT INTO follow (channel_id, follower_id) VALUES (?, ?)", [
            req.query.channelId,
            req.query.userId,
          ])
          .then(() => {
            res.status(200).send("Données insérées avec succès !");
          })
          .catch((error) => {
            console.error("Erreur lors de la soumission des données :", error);
            res
              .status(500)
              .send(
                "Une erreur est survenue lors de la soumission des données."
              );
          });
      }
    });
};

module.exports = {
  getFollow,
  follow,
};
