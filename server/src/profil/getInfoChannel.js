const mariadb = require("../src/database"); // Import your database connection

console.error("start of processing..."); // Logging start of processing

const getInfoChannel = (req, res) => {
  // Extract the user ID from the session
  const userId = req.session.userId;

  // Execute a SQL query to fetch channel information based on the user ID
  mariadb.pool
    .query(
      "SELECT pseudo, identifier_channel, nb_follower FROM channel WHERE user_id = ?",
      [userId]
    )
    .then((result) => {
      // Check if channel information is found
      if (result.length > 0) {
        // If found, send the first row of the result as the response
        res.status(200).json(result[0]);
      } else {
        // If no channel information is found, send a 404 status with an appropriate message
        res.status(404).json({ message: "Channel information not found" });
      }
    })
    .catch((error) => {
      // Handling errors if any occur during the database operation
      console.error("Error retrieving channel info:", error);
      // Returning a 500 status with an error message
      res.status(500).json({ message: "Internal Server Error" });
    });
};

module.exports = { getInfoChannel };
