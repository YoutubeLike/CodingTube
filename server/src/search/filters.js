const mariadb = require('../src/database');

const filters = async (req, res) => {
    const filterValue = req.params.buttonValue;
    const inputSearch = req.params.videoSearch;
    try {
        if (filterValue === "All"){
            const results = await mariadb.pool.query("SELECT video.*, user.PP FROM video JOIN channel ON video.channel_id=channel.id JOIN user ON channel.user_id=user.id WHERE title LIKE UPPER(?);",["%"+ inputSearch +"%"]);
            res.status(200).send(results);
        }else if(filterValue === "Recently-uploaded"){
            const results = await mariadb.pool.query("SELECT video.*, user.PP FROM video JOIN channel ON video.channel_id=channel.id JOIN user ON channel.user_id=user.id WHERE upload_date_time > NOW() - INTERVAL 1 DAY AND title LIKE UPPER(?);",["%"+ inputSearch +"%"]);
            console.error(results)
            res.status(200).send(results);
        }else{
        const results = await mariadb.pool.query("SELECT video.*, user.PP FROM video JOIN channel ON video.channel_id=channel.id JOIN user ON channel.user_id=user.id WHERE category = UPPER(?) AND title LIKE UPPER(?);",[ filterValue, "%"+ inputSearch +"%"]);
        res.status(200).send(results);}
    } catch (error) {erreur
        res.status(500).send(error.message);
    }
}
module.exports = {filters} 