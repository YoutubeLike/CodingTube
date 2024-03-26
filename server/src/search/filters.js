const mariadb = require('../src/database');

const filters = async (req, res) => {
    const filterValue = req.params.buttonValue;

    try {
        const results = await mariadb.pool.query("SELECT video.*, user.PP  FROM video JOIN channel ON video.channel_id=channel.id JOIN user ON channel.user_id=user.id WHERE category = ? ;",[filterValue]);
        res.status(200).send(results); 
    } catch (error) {erreur
        res.status(500).send(error.message);
    }
}
module.exports = {filters}