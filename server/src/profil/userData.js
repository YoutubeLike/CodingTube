const mariadb = require("../src/database");
console.error("Début du traitement...");

const userData = (req, res) => {
    const userId = req.params.info_user
    mariadb.pool.query("SELECT id, first_name, last_name, mail, birthdate, gender, country, PP, username FROM user WHERE id = ?" , [userId]).then((value) => {
      res.send(value[0]);
    });
  };

module.exports = {userData}
