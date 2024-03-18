const mariadb = require('../src/database');

const history = async (req, res) => {
    try {
        const results = await mariadb.pool.query("SELECT search_name FROM search JOIN search_history ON search.id=search_history.search_id WHERE search_history.user_id=session_id ORDER BY search_history.research_date LIMIT 10;");
        res.status(200).send(results); 
    } catch (error) {
        res.status(500).send("Une erreur est survenue lors du traitement.");
    }
}
module.exports = {history}