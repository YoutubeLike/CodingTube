const mariadb = require('../src/database');

const mostResearch = async (req, res) => {
    try {
        const results = await mariadb.pool.query("SELECT name_search FROM search ORDER BY number_search DESC LIMIT 10;");
        res.status(200).send(results); 
    } catch (error) {
        res.status(500).send("Une erreur est survenue lors du traitement.");
    }
}

module.exports = {mostResearch}