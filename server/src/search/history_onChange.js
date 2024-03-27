const mariadb = require('../src/database');

const history_onChange = async (req, res) => {
    const userId = req.params.userId;
    const inputSearch = req.params.researchInput;
    try {
        const results = await mariadb.pool.query("SELECT name_search, search_history.id FROM search JOIN search_history ON search.id=search_history.search_id WHERE search_history.user_id = ? AND name_search LIKE ? ORDER BY search_history.research_date LIMIT 10;", [userId, '%'+inputSearch+'%']);
        res.status(200).send(results); 
    } catch (error) {erreur
        res.status(500).send(error.message);
    }
}

module.exports = {history_onChange}