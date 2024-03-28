const mariadb = require("../src/database"); /* Connexion to database */
const bcrypt = require("bcryptjs");
console.error("Début du traitement de updatePswrd"); // Logging start of processing



const updatePassword = async (req, res) => {
  console.log(req.session.userId + "helloworld ")
  try {
    const {currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.session.userId;
    console.log("coucou" + userId)
    console.log("on récup les infos")
    // Check if the new password matches the confirmed password
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }

    // Fetch user data from the database
    const userData = await mariadb.pool.query(
      "SELECT * FROM user WHERE id = ?",
      [userId]
    );
    console.log("on récup les infos du user")

    if (userData.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userData[0];

    // Check if the current password matches the password in the database
    
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash the new password before updating it in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await mariadb.pool.query("UPDATE user SET password = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);

    // Respond with success message
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { updatePassword }; // Exporting the updatePassword function
