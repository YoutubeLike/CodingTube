const mariadb = require('../src/database');

const submit = async (req, res) => {
    const submitValue = req.params.submit;

    try {
        // Vérifier si l'élément existe dans la base de données
        const results = await mariadb.pool.query("SELECT * FROM search WHERE name_search = UPPER(?)", [submitValue]);

        if (results.length === 0) {

            // Si l'élément n'existe pas, l'ajouter à la base de données
            await mariadb.pool.query("INSERT INTO search (number_search, name_search) VALUES (1, ?)", [submitValue]);

            console.log("Élément ajouté avec succès.");
            res.status(200).send("Élément ajouté avec succès.");
        } else {

            // Si l'élément existe, mettre à jour sa valeur
            const currentValue = results[0].number_search;
            const newValue = currentValue + 1;

            await mariadb.pool.query("UPDATE search SET number_search = ? WHERE name_search = ?", [newValue, submitValue]);

            console.log("Élément mis à jour avec succès.");
            res.status(200).send("Élément mis à jour avec succès.");
        }
    } catch (error) {
        console.error("Une erreur est survenue :", error);
        res.status(500).send("Une erreur est survenue lors du traitement.");
    }
};

module.exports = { submit };