const mariadb = require('../src/database');

const history = async (req, res) => {
    if (req.session.userId){
        const userValue = req.session.userId;

        try {
            const results = await mariadb.pool.query("SELECT name_search, search_history.id FROM search JOIN search_history ON search.id=search_history.search_id WHERE search_history.user_id=? ORDER BY search_history.research_date LIMIT 10;",[userValue]);
            res.status(200).json(results); 
        } catch (error) {erreur
            res.status(500).send(error.message);
        }
    }else {
        console.log("vous n'etes pas connecté Cyka bliat for History")
    }
}
module.exports = {history}