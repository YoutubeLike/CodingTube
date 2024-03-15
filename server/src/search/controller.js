const mariadb = require('./src/database');

const submit = (req, res) => {
    const submitValue = req.params.submit;

    mariadb.pool.query("INSERT INTO search (number_search, name_search) VALUES (1, ?)", [submitValue], (error, results, fields) => {
        if (error) {
            console.error("Erreur lors de l'insertion des données :", error);
            res.status(500).send("Une erreur est survenue lors de l'insertion des données.");
            return;
        }

        console.log("Données insérées avec succès.");
        res.status(200).send("Ça marche !"); // Envoyer la réponse ici, après l'insertion réussie
    });
};

module.exports = { submit };