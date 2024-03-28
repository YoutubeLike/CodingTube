const mariadb = require('../src/database');

const deleteHistory = async (req, res) => {
    const searchValue = req.params.deleteHistory;
try {
        const results = await mariadb.pool.query("DELETE FROM search_history WHERE id = ?;",[searchValue]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {deleteHistory}