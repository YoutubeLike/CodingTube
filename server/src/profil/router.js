const express = require("express");
const router = express.Router();

// Importing functions from other files
const {
  InsertUser,
  CheckIfMailExist,
  CheckIfUsernameExist,
  CheckIfPasswordMatch,
  GetPasswordFromUsernameOrEmail,
} = require("./authentication");
const { userData } = require("./userData.js"); // Importing userData function
const { userUpdate } = require("./userUpdate.js"); // Importing userUpdate function
const { updatePassword } = require("./updatePswrd.js"); // Importing updatePassword function

router.post("/updatePswrd", updatePassword);

// Endpoint to get user data based on user ID
router.get("/userData/:info_user", userData);

// Endpoint to update user data
router.post("/userUpdate", userUpdate);

// Endpoint to register a new user
router.post("/register", async (req, res) => {
  const registerData = req.body.registerData;
  try {
    // Checking if username contains '@'
    if (registerData.username.includes("@")) {
      console.log("Username cannot contain '@'");
      return res.status(400).json({ error: "Username cannot contain '@'" });
    } 

    // Checking if email address is valid using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.mail)) {
      console.log("Invalid email address");
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Checking if username and email are already taken
    const usernameExist = await CheckIfUsernameExist(registerData.username);
    const mailExist = await CheckIfMailExist(registerData.mail);
    const passwordMatch = await CheckIfPasswordMatch(
      registerData.password,
      registerData.confirmPassword
    );

    if (registerData.username != "" && usernameExist) {
      console.log("Username is already taken");
      return res.status(400).json({ error: "Username is already taken" });
    } else if (registerData.mail != "" && mailExist) {
      console.log("Mail is already taken");
      return res.status(400).json({ error: "Mail is already taken" });
    } else if (
      registerData.password != "" &&
      registerData.confirmPassword != "" &&
      registerData.username != "" &&
      registerData.mail != ""
    ) {
      // Validating password using regular expression
      const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
      if (
        registerData.password != "" &&
        !passwordRegex.test(registerData.password)
      ) {
        console.log("Password does not meet requirements");
        return res
          .status(400)
          .json({
            error:
              "Password must contain at least 8 characters, 1 uppercase, 1 special character, and 1 digit",
          });
      }
      if (registerData.password == registerData.confirmPassword) {
        await InsertUser(registerData);
        console.log("User inserted successfully");
        return res.status(200).json({ message: "User registered successfully" });
      } else {
        return res.status(400).json({ error: "Passwords do not match" });
      }
    } else {
      return res.status(400).json({ error: "Fields can't be empty" });
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.sendStatus(500);
  }
});

// Endpoint for user login
router.post("/login", async (req, res) => {
  const loginData = req.body.loginData;
  try {
    const usernameExist = await CheckIfUsernameExist(loginData.usernameOrMail);
    const mailExist = await CheckIfMailExist(loginData.usernameOrMail);
    const passwordFromDb = await GetPasswordFromUsernameOrEmail(loginData.usernameOrMail);
    const isPasswordMatch = await CheckIfPasswordMatch(loginData.password, passwordFromDb)

    if (loginData.usernameOrMail != "" && loginData.password != "") {

      if (usernameExist || mailExist) {
        if (isPasswordMatch) {
          console.log("User signed in successfully");
          return res.status(200).json({ message: "User signed in successfully" });
        } else {
          return res.status(400).json({ error: "Incorrect password" });
        }
      } else {
        return res.status(400).json({ error: "Account not found" });
      }
    } else {
      return res.status(400).json({ error: "Fields can't be empty" });
    }
  } catch (error) {
    console.error("Error during user login:", error);
    return res.sendStatus(500);
  }
});

module.exports = router; // Exporting the router
