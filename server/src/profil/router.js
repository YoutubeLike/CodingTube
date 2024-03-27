const express = require("express");
const router = express.Router();

// Importing functions from other files
const {
  // Importing functions from authentication module
  InsertUser,
  CheckIfMailExist,
  CheckIfUsernameExist,
  CheckIfPasswordMatch,
  GetPasswordFromUsernameOrEmail,
  GetUserId,
} = require("./authentication");

const { userData } = require("./userData.js"); // Importing userData function
const { userUpdate } = require("./userUpdate.js"); // Importing userUpdate function
const { updatePassword } = require("./updatePswrd.js"); // Importing updatePassword function


router.get("/updatePswrd", updatePassword);

// Endpoint to get user data based on user ID
router.get("/userData/:info_user", userData);

// Endpoint to update user data
router.post("/userUpdate", userUpdate);


// Route for user registration
router.post("/register", async (req, res) => {
  const registerData = req.body.registerData; // Extracting registration data from request body
  try {

    if (
      registerData.username != "" ||
      registerData.mail != "" ||
      registerData.password != "" ||
      registerData.confirmPassword != ""
    ) {
      // Check if the username contains '@'
      if (registerData.username.includes("@")) {
        console.log("Username cannot contain '@'");
        return res.status(400).json({ error: "Username cannot contain '@'" });
      }

      // Regular expression to validate email address format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registerData.mail)) {
        console.log("Invalid email address");
        return res.status(400).json({ error: "Invalid email address" });
      }

      // Check if username and email already exist
      const usernameExist = registerData.username
        ? await CheckIfUsernameExist(registerData.username)
        : false;
      const mailExist = registerData.mail
        ? await CheckIfMailExist(registerData.mail)
        : false;

      // Check if passwords match
      const passwordMatch = await CheckIfPasswordMatch(
        registerData.password,
        registerData.confirmPassword
      );

      if (usernameExist) {
        console.log("Username is already taken");
        return res.status(400).json({ error: "Username is already taken" });
      } else if (mailExist) {
        console.log("Mail is already taken");
        return res.status(400).json({ error: "Mail is already taken" });
      } else if (
        registerData.password &&
        registerData.confirmPassword &&
        registerData.username &&
        registerData.mail

      ) {
        // Validation of password using regular expression
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!passwordRegex.test(registerData.password)) {
          console.log("Password does not meet requirements");
          return res.status(400).json({
            error:
              "Password must contain at least 8 characters, 1 uppercase, 1 special character, and 1 digit",
          });

        }
        if (registerData.password == registerData.confirmPassword) {
          await InsertUser(registerData);
          const userId = await GetUserId(registerData.mail);
          req.session.userId = userId ;
          req.session.save()
          res.cookie("CodingTube", req.session, {sameSite: "none", secure: true})
          return res.json(req.session);
        } else {
          return res.status(400).json({ error: "Passwords do not match" });
        }
      } 
    } else {
        return res.status(400).json({ error: "Fields can't be empty" });
      }
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.sendStatus(500);
  }
});


// Route for user login
router.post("/login", async (req, res) => {
  const loginData = req.body.loginData; // Extracting login data from request body

  try {
    // Check if username or email exists in the database
    const usernameExist = await CheckIfUsernameExist(loginData.usernameOrMail);
    const mailExist = await CheckIfMailExist(loginData.usernameOrMail);



    // Get password associated with username or email from the database
    const passwordFromDb = await GetPasswordFromUsernameOrEmail(
      loginData.usernameOrMail
    );

    // Check if password matches with the one in the database
    const isPasswordMatch = await CheckIfPasswordMatch(
      loginData.password,
      passwordFromDb
    );
    if (loginData.usernameOrMail != "" || loginData.password != "") {
      if (usernameExist || mailExist) {
        if (isPasswordMatch) {
            // Create a session and save the id of the user to it
            const userId = await GetUserId(loginData.usernameOrMail);
            res.setHeader('Content-Type', 'text/html')
            // res.setHeader('Set-Cookie: ')

            req.session.userId = userId ;
            req.session.save()
            res.cookie("CodingTube", req.session, {sameSite: "none", secure: true})
            return res.json(req.session);

            //return res.status(400).json({ error: "User logged In Successfully!" });
            //return res.status(200).json({ redirectTo: '/' });


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

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.session.userId + " logged in");
      return res.json({ message: 'logout' });
    }
  });
});



module.exports = router; // Exporting the router module
