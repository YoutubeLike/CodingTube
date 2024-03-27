const mariadb = require("../src/database"); /* Connexion to database */
const bcrypt = require("bcryptjs");
console.error("Début du traitement..."); // Logging start of processing

const {
  // Importing functions from authentication module
  InsertUser,
  CheckIfMailExist,
  CheckIfUsernameExist,
  CheckIfPasswordMatch,
  GetPasswordFromUsernameOrEmail,
  GetUserId,
} = require("./authentication");

async function GetPasswordFromId(data) {
  try {
    // Establishing a database connection
    const conn = await mariadb.pool.getConnection();
    // Executing the SQL query to retrieve the hashed password
    const result = await conn.query("SELECT password FROM user WHERE id = ?", [
      data,
    ]);
    // Releasing the database connection
    conn.release();
    // Returning the hashed password if found
    return result[0].password;
  } catch (err) {
    // Handling errors if any occur during the database operation
    console.log("Error retrieving password:", err);
    // Returning false in case of an error
    return false;
  }
}

const updatePassword = (req, res) => {
  const password = req.body; // Extracting id and password from request body
  console.log("fzghqdiefokpledk^pjfjdqvfbknbfd,gdgmf,zlkhfsvjbdfkjnl,mfqnkdl")
  console.log(password)
  const userId = req.session.userId

  // Get password associated with username or email from the database
  const passwordFromDb = GetPasswordFromId(password.id);

  // Check if password matches with the one in the database
  const isPasswordMatch = CheckIfPasswordMatch(
    password.currentPassword,
    passwordFromDb
  );

  // Check if passwords match
  const passwordMatch = CheckIfPasswordMatch(
    password.currentPassword,
    password.newConfirmPassword
  );

  if (passwordMatch) {
    if (isPasswordMatch) {
      try {
        const hashedPassword = bcrypt.hash(password.currentPassword, 10);
        mariadb.pool
          .query("UPDATE user SET password = ? WHERE id = ?", [
            hashedPassword,
            userId,
          ]) // Updating user's password in the database
          .then((value) => {
            // Once the query is successful, send the first row of the result as the response
            res.send(value[0]);
          });
      } catch (e) {
        console.error("Error updating password:", error); // Logging error if password update fails
        res
          .status(500)
          .send({ success: false, message: "Internal server error" }); // Sending internal server error response
      }
    } else {
      return res.status(400).json({ error: "Incorrect password" });
    }
  } else {
    return res.status(400).json({ error: "Incorrect password" });
  }
};

module.exports = { updatePassword }; // Exporting the updatePassword function
