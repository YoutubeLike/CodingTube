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

async function CheckIfUsernameExist(data) {
    try {
        const conn = await mariadb.pool.getConnection();
        const result = await conn.query("SELECT COUNT(*) as count FROM user WHERE username = ?", [data]);
        conn.release();
        return result[0].count > 0; 
    } catch (err) {
        console.log("Erreur lors de la vérification du nom d'utilisateur :", err);
        return false; 
    }
}

async function CheckIfMailExist(data) {
    try {
        const conn = await mariadb.pool.getConnection();
        const result = await conn.query("SELECT COUNT(*) as count FROM user WHERE mail = ?", [data]);
        conn.release();
        return result[0].count > 0;
    } catch (err) {
        console.log("Erreur lors de la vérification du mail :", err);
        return false; 
    }
}

async function GetPasswordFromUsernameOrEmail(data){
    try {
        const conn = await mariadb.pool.getConnection();
        const result = await conn.query("SELECT password FROM user WHERE username = ? OR mail = ?", [data, data]);
        conn.release();
        return result[0].password;
    } catch (err) {
        console.log("Error in retrieving password", err);
        return false; // ou une autre valeur par défaut
    }
}

async function CheckIfPasswordMatch(password, hashedPasswordFromDB) {
    try {
        const isPasswordMatch = await bcrypt.compare(password, hashedPasswordFromDB);
        return isPasswordMatch;
    } catch (error) {
        console.error("Erreur lors de la comparaison des mots de passe :", error);
    }
}

module.exports = {InsertUser, CheckIfMailExist, CheckIfUsernameExist, CheckIfPasswordMatch, GetPasswordFromUsernameOrEmail, CheckIfPasswordMatch};

//InsertUser(registerData)
// CheckIfUserExistAndIfPasswordMatch(loginData);
