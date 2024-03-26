const mariadb = require("../src/database"); /*Connexion to database */

console.error("Début du traitement...");

const userData = (req, res) => {
  // Extract the user ID from the request parameters
  const userId = req.session.userId;

  // Execute a SQL query to fetch user data based on the provided ID
  mariadb.pool
    .query( 
      "SELECT id, first_name, last_name, mail, birthdate, gender, country, PP, username, password FROM user WHERE id = ?",
      [userId]
    )
    .then((value) => {
      // Once the query is successful, send the first row of the result as the response
      res.send(value[0]);
    });
};

module.exports = { userData };
