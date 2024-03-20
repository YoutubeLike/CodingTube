const mariadb = require('../src/database');

const mostResearch_onChange = async (req, res) => {
    const inputSearch = req.params;
    try {
        const results = await mariadb.pool.query("SELECT name_search FROM search WHERE name_search LIKE '%?%' ORDER BY number_search DESC LIMIT 10;", inputSearch);
        res.status(200).send(results); 
    } catch (error) {
        res.status(500).send("Une erreur est survenue lors du traitement.");
    }
}
module.exports = {mostResearch_onChange}