const mariadb = require("../src/database");
console.error("Début du traitement...");

const formatDateForBackend = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const userUpdate = (req, res) => {
  const updatedUserData = req.body;
  const formattedBirthdate = formatDateForBackend(updatedUserData.birthdate);
  mariadb.pool
    .query(
      "UPDATE user SET first_name = ?, last_name = ?, mail = ?, birthdate = ?, country = ?, gender = ? WHERE id = ?",
      [
        updatedUserData.first_name,
        updatedUserData.last_name,
        updatedUserData.mail,
        formattedBirthdate,
        updatedUserData.country,
        updatedUserData.gender,
        1,
      ]
    )
    .then((result) => {
      if (result.affectedRows > 0) {
        // if at least one userinfo is update it return a message success
        res.send({ success: true, message: "User updated successfully" });
      } else {
        // if there is no change on userdata it return a message user not found
        res.status(404).send({ success: false, message: "User not found" });
      }
    })
    .catch((error) => {
      // if there is error while sql request
      console.error("Error updating user:", error);
      res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    });
};

module.exports = { userUpdate };
