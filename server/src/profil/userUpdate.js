// Importing the mariadb module
const mariadb = require("../src/database");

// Importing functions from authentication module
const { CheckIfMailExist, CheckIfUsernameExist } = require("./authentication");

// Logging the start of the processing
console.error("Début du traitement... (Processing started...)");

// Function to format date for the backend
const formatDateForBackend = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding leading zeros if needed
  const day = String(date.getDate()).padStart(2, "0"); // Adding leading zeros if needed
  return `${year}-${month}-${day}`;
};

const userUpdate = async (req, res) => {
  try {
    const updatedUserData = req.body;
    const userId = req.session.userId;
    const formattedBirthdate = formatDateForBackend(updatedUserData.birthdate);

    // Get the current user data from the database
    const currentUserData = await mariadb.pool.query(
      "SELECT username, mail FROM user WHERE id = ?",
      [1]
    );

    const currentUsername = currentUserData[0].username;
    const currentMail = currentUserData[0].mail;

    // Check if the updated username already exists in the database
    let usernameExist = false;
    if (updatedUserData.username !== currentUsername) {
      usernameExist = await CheckIfUsernameExist(
        updatedUserData.username
      );
    }

    // Check if the updated mail already exists in the database
    let mailExist = false;
    if (updatedUserData.mail !== currentMail) {
      mailExist = await CheckIfMailExist(updatedUserData.mail);
    }

    // If username or mail already exists, send an error response
    if (usernameExist) {
      console.log("username already taken")
      return res.status(400).json({ error: "Username is already taken" });
    } else if (mailExist) {
      console.log("mail already taken ")
      return res.status(400).json({ error: "Mail is already taken" });
    }

    // Perform the SQL update query
    const result = await mariadb.pool.query(
      "UPDATE user SET username = ?, first_name = ?, last_name = ?, mail = ?, birthdate = ?, country = ?, gender = ? WHERE id = ?",
      [
        updatedUserData.username,
        updatedUserData.first_name,
        updatedUserData.last_name,
        updatedUserData.mail,
        formattedBirthdate,
        updatedUserData.country,
        updatedUserData.gender,
        1,
      ]
    );

    if (result.affectedRows > 0) {
      res.send({ success: true, message: "User updated successfully" });
    } else {
      res.status(404).send({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// Exporting the userUpdate function
module.exports = { userUpdate };
