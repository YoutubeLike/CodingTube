const mariadb = require('../src/database');
console.error("Début du traitement...");

const search_history = async (req, res) => {

    try {
        // Vérifier si l'élément existe dans la base de données
        const results = await mariadb.pool.query("SELECT name_search FROM search ORDER BY number_search DESC LIMIT 14;");
        res.send(results)
        console.log("Élément ajouté avec succès.");
        res.status(200).send("Élément ajouté avec succès.");
        console.error("Je suis juste après la requête SELECT");

    } catch (error) {
        console.error("Une erreur est survenue :", error);
        res.status(500).send("Une erreur est survenue lors du traitement.");
    }
};

module.exports = { search_history };
