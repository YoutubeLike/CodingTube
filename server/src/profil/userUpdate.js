// Importing the mariadb module
const mariadb = require("../src/database");

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

// Function to handle user update
const userUpdate = (req, res) => {
  // Extracting updated user data from the request body
  const updatedUserData = req.body;
  const userId = req.session.userId;

  // Formatting birthdate to match the database format
  const formattedBirthdate = formatDateForBackend(updatedUserData.birthdate);

  // Performing the SQL update query
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
        userId, // Assuming user ID is 1 for now
      ]
    )
    .then((result) => {
      if (result.affectedRows > 0) {
        // If at least one userinfo is updated, return a success message
        res.send({ success: true, message: "User updated successfully" });
      } else {
        // If there is no change on userdata, return a message indicating user not found
        res.status(404).send({ success: false, message: "User not found" });
      }
    })
    .catch((error) => {
      // If there is an error while executing the SQL request
      console.error("Error updating user:", error);
      res
        .status(500)
        .send({ success: false, message: "Internal server error" }); // Sending an internal server error response
    });
};

// Exporting the userUpdate function
module.exports = { userUpdate };
