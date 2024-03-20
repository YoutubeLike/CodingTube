const mariadb = require("../src/database");
console.error("Début du traitement...");

const updateUser = (req, res) =>{
    const updatedUserData = req.params.update_user;
    mariadb.pool.query("UPDATE user SET first_name = ?, last_name = ?, mail = ?, birthdate = ?, country = ?, gender = ? WHERE id = ?",
        [
            updatedUserData.first_name,
            updatedUserData.last_name,
            updatedUserData.mail,
            updatedUserData.birthdate,
            updatedUserData.country,
            updatedUserData.gender,
            updatedUserData.id
          ]).then((value) => {
            res.send(value[0]);
          });
    }

module.exports = {updateUser}