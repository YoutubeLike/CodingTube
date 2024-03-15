const express = require('express');
const router = express.Router();
const {InsertUser, 
    CheckIfMailExist, 
    CheckIfUsernameExist, 
    CheckIfPasswordMatch, 
    CheckIfUserExistAndIfPasswordMatch
} = require("./authentication")

router.post('/register', async (req, res) => {
    const registerData = req.body.register;
    try {
        const usernameExist = await CheckIfUsernameExist(registerData);
        const mailExist = await CheckIfMailExist(registerData);
        const passwordMatch = await CheckIfPasswordMatch(registerData.password, registerData.confirmPassword);

        if (registerData.username != "" && usernameExist) {
            console.log('Username is already taken');
            return res.status(400).json({error:'Username is already taken'});
        } else if (registerData.mail != "" && mailExist) {
            console.log('Mail is already taken');
            return res.status(400).json({error:'Mail is already taken'});
        } else {
            // Validation du mot de passe avec une expression régulière
            const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
            if (registerData.password != "" &&!passwordRegex.test(registerData.password)) {
                console.log('Password does not meet requirements');
                return res.status(400).json({error:'Password must contain at least 8 characters, 1 uppercase, 1 special character; 1 digit'});
            }
            if (registerData.password != "" && registerData.confirmPassword != "" && passwordMatch) {
                await InsertUser(registerData);
                console.log('User inserted successfully');
                return res.status(400).json({error:'User registered successfully'});
            } else if (registerData.password != "" && registerData.confirmPassword != ""){
                return res.status(400).json({error:'Passwords do not match'});
        } else{
            return res.status(400).json({error:'Please complete the form'});
        }
    }
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.sendStatus(500);
    }
});

router.post('/login', async (req, res) =>{
    const loginData = req.body.register;
})

  module.exports = router;
  