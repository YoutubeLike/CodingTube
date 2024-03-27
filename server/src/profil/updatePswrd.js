const mariadb = require("../src/database"); /* Connexion to database */
console.error("Début du traitement..."); // Logging start of processing

const updatePassword = (req, res) => {
  const { id, password } = req.body; // Extracting id and password from request body
  mariadb.pool
    .query("UPDATE user SET password = ? WHERE id = ?", [password, id]) // Updating user's password in the database
    .then((result) => {
      if (result.affectedRows > 0) { // Checking if any rows were affected by the update
        res.send({ success: true, message: "Password updated successfully" }); // Sending success response if password updated
      } else {
        res.status(404).send({ success: false, message: "User not found" }); // Sending error response if user not found
      }
    })
    .catch((error) => {
      console.error("Error updating password:", error); // Logging error if password update fails
      res
        .status(500)
        .send({ success: false, message: "Internal server error" }); // Sending internal server error response
    });
};

module.exports = { updatePassword }; // Exporting the updatePassword function

