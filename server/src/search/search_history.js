const mariadb = require('../src/database');
console.error("Début du traitement...");

const search_history = async (req, res) => {

    console.error("Valeur soumise :", submitValue);

    try {
        // Vérifier si l'élément existe dans la base de données
        const results = await mariadb.pool.query("SELECT * FROM search WHERE name_search = UPPER(?)", [submitValue]);

        console.error("Je suis juste après la requête SELECT");

    } catch (error) {
        console.error("Une erreur est survenue :", error);
        res.status(500).send("Une erreur est survenue lors du traitement.");
    }
};

module.exports = { search_history };
