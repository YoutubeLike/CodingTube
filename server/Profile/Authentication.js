const express = require('express');
const mariadb = require('../src/database');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');

app.use(cors())

// request for register
async function InsertUser(registerData) {
    try {
        const hashedPassword = await bcrypt.hash(registerData.password, 10);
        const conn = await mariadb.pool.getConnection();
        await conn.query("INSERT INTO User (username, mail, password) VALUES (?, ?, ?)", [registerData.username, registerData.mail, hashedPassword]);
        conn.release();
        console.log("Utilisateur inséré avec succès");
    } catch (err) {
        console.log("Erreur lors de l'insertion de l'utilisateur :", err);
    }
}

async function CheckIfUsernameExist(registerData) {
    try {
        const conn = await mariadb.pool.getConnection();
        const result = await conn.query("SELECT COUNT(*) as count FROM user WHERE username = ?", [registerData.username]);
        conn.release();
        return result[0].count > 0; 
    } catch (err) {
        console.log("Erreur lors de la vérification du nom d'utilisateur :", err);
        return false; 
    }
}

async function CheckIfMailExist(registerData) {
    try {
        const conn = await mariadb.pool.getConnection();
        const result = await conn.query("SELECT COUNT(*) as count FROM user WHERE mail = ?", [registerData.mail]);
        conn.release();
        return result[0].count > 0;
    } catch (err) {
        console.log("Erreur lors de la vérification du mail :", err);
        return false; 
    }
}


async function CheckIfPasswordMatch(password1, password2){

    if (password1 == password2){
        console.log('password match')
        return true;
    }
    else{
        console.log('password not match')
        return false;
    }
}

async function CheckIfUserExistAndIfPasswordMatch(loginData){
    try {
        const conn = await mariadb.pool.getConnection();
        const result = await conn.query("SELECT password FROM user WHERE username = ? OR mail = ?", [loginData.usernameOrMail, loginData.usernameOrMail]);
        conn.release();

        const isPasswordMatch = await bcrypt.compare(loginData.password, result[0].password);
        if (isPasswordMatch) {
            console.log('Mot de passe correct');
            return true;
        } else {
            console.log('Mot de passe incorrect');
            return false;
        }

    } catch (err) {
        console.log("Error in retrieving password", err);
        return false; // ou une autre valeur par défaut
    }
}


const loginData = {
    usernameOrMail:'elwan@gmail.com',
    password:'Elwan123'
    }

const registerData = {
    username:'Elwan',
    mail:'elwan@gmail.com',
    password:'Elwan123'
}


module.exports = {InsertUser, CheckIfMailExist, CheckIfUsernameExist, CheckIfPasswordMatch, CheckIfUserExistAndIfPasswordMatch};

//InsertUser(registerData)
// CheckIfUserExistAndIfPasswordMatch(loginData);
