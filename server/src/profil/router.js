const express = require("express");
const router = express.Router();
const {
  InsertUser,
  CheckIfMailExist,
  CheckIfUsernameExist,
  CheckIfPasswordMatch,
  GetPasswordFromUsernameOrEmail,
} = require("./authentication");

router.post("/register", async (req, res) => {
  const registerData = req.body.registerData;
  try {
    // Vérification si le nom d'utilisateur contient un arobase
    if (registerData.username.includes("@")) {
        console.log("Username cannot contain '@'");
        return res.status(400).json({ error: "Username cannot contain '@'" });
    }

    // Vérification si l'adresse e-mail est valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.mail)) {
        console.log("Invalid email address");
        return res.status(400).json({ error: "Invalid email address" });
    }

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
      // Validation du mot de passe avec une expression régulière
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
              "Password must contain at least 8 characters, 1 uppercase, 1 special character; 1 digit",
          });
      }
      if (registerData.password == registerData.confirmPassword) {
        await InsertUser(registerData);
        console.log("User inserted successfully");
        return res.status(400).json({ error: "User registered successfully" });
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

router.post("/login", async (req, res) => {
  const loginData = req.body.loginData;
  console.log(loginData)
  try {
    const usernameExist = await CheckIfUsernameExist(loginData.usernameOrMail);
    const mailExist = await CheckIfMailExist(loginData.usernameOrMail);
    const passwordFromDb = await GetPasswordFromUsernameOrEmail(loginData.usernameOrMail);
    const isPasswordMatch = await CheckIfPasswordMatch(loginData.password, passwordFromDb)

    console.log(loginData.password);
    console.log(passwordFromDb);
    

    console.log(isPasswordMatch);


    console.log(usernameExist, mailExist);
    if(loginData.usernameOrMail != ""  && loginData.password != "") {

        if (usernameExist || mailExist) {

            if (isPasswordMatch) {
                console.log("User signed in successfully");
                return res.status(400).json({ error: "User signed in successfully" });
            }else{
                return res.status(400).json({ error: "Incorrect password" });
            }
        }else{
            return res.status(400).json({ error: "Account not found" });
        }
    }else{
        return res.status(400).json({ error: "Fields can't be empty" })
    }
}catch (error) {
    console.error("Error during user registration:", error);
    return res.sendStatus(500);
  }
});
module.exports = router;
