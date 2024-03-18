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
      if (registerData.username.includes("@")) {
          console.log("Username cannot contain '@'");
          return res.status(400).json({ error: "Username cannot contain '@'" });
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registerData.mail)) {
          console.log("Invalid email address");
          return res.status(400).json({ error: "Invalid email address" });
      }
  
      const usernameExist = registerData.username ? await CheckIfUsernameExist(registerData.username) : false;
      const mailExist = registerData.mail ? await CheckIfMailExist(registerData.mail) : false;
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
        
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!passwordRegex.test(registerData.password)) {
          console.log("Password does not meet requirements");
          return res
            .status(400)
            .json({
              errorRegister:
                "Password must contain at least 8 characters, 1 uppercase, 1 special character; 1 digit",
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
                return res.status(200).json({ message: "User signed in successfully" });
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
