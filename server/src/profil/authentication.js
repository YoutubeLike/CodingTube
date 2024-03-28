const express = require('express');
const mariadb = require('../src/database');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");



// Middleware for enabling CORS
app.use(cors());

/**
 * Inserts a new user into the database after hashing the password.
 * @param {Object} registerData - Object containing user registration data.
 */
async function InsertUser(registerData) {
    try {
        // Hashing the user's password
        const hashedPassword = await bcrypt.hash(registerData.password, 10);
        const tokenId = crypto.randomBytes(32).toString('hex');
        // Establishing a database connection
        const conn = await mariadb.pool.getConnection();
        // Executing the SQL query to insert user data into the database
        await conn.query("INSERT INTO User (username, mail, password) VALUES (?, ?, ?)", [registerData.username, registerData.mail, hashedPassword]);
        // Releasing the database connection
        conn.release();
        console.log("User inserted successfully");
    } catch (err) {
        // Handling errors if any occur during the insertion process
        console.log("Error inserting user:", err);
    }
}

async function InsertDiscordUser(username, email) {
    try {
        // Establishing a database connection
        const conn = await mariadb.pool.getConnection();
        // Executing the SQL query to insert user data into the database
        await conn.query("INSERT INTO User (username, mail, discordAccount) VALUES (?, ?, true)", [username, email]);
        // Releasing the database connection
        conn.release();
        console.log("User inserted successfully");
    } catch (err) {
        // Handling errors if any occur during the insertion process
        console.log("Error inserting user:", err);
    }
}

/**
 * Checks if a username already exists in the database.
 * @param {string} data - Username to be checked.
 * @returns {boolean} - Returns true if the username exists, otherwise returns false.
 */
async function CheckIfUsernameExist(data) {
    try {
        // Establishing a database connection
        const conn = await mariadb.pool.getConnection();
        // Executing the SQL query to check if the username exists
        const result = await conn.query("SELECT COUNT(*) as count FROM user WHERE username = ?", [data]);
        // Releasing the database connection
        conn.release();
        // Returning true if the count is greater than 0, indicating the username exists
        return result[0].count > 0;
    } catch (err) {
        // Handling errors if any occur during the database operation
        console.log("Error checking username existence:", err);
        // Returning false in case of an error
        return false;
    }
}

/**
 * Checks if an email address already exists in the database.
 * @param {string} data - Email address to be checked.
 * @returns {boolean} - Returns true if the email address exists, otherwise returns false.
 */
async function CheckIfMailExist(data) {
    try {
        // Establishing a database connection
        const conn = await mariadb.pool.getConnection();
        // Executing the SQL query to check if the email address exists
        const result = await conn.query("SELECT COUNT(*) as count FROM user WHERE mail = ?", [data]);
        // Releasing the database connection
        conn.release();
        // Returning true if the count is greater than 0, indicating the email address exists
        return result[0].count > 0;
    } catch (err) {
        // Handling errors if any occur during the database operation
        console.log("Error checking email existence:", err);
        // Returning false in case of an error
        return false;
    }
}

/**
 * Retrieves the hashed password associated with a given username or email from the database.
 * @param {string} data - Username or email address.
 * @returns {string} - Returns the hashed password if found, otherwise returns false.
 */
async function GetPasswordFromUsernameOrEmail(data){
    try {
        // Establishing a database connection
        const conn = await mariadb.pool.getConnection();
        // Executing the SQL query to retrieve the hashed password
        const result = await conn.query("SELECT password FROM user WHERE username = ? OR mail = ?", [data, data]);
        // Releasing the database connection
        conn.release();
        // Returning the hashed password if found
        return result[0].password;
    } catch (err) {
        // Handling errors if any occur during the database operation
        console.log("Error retrieving password:", err);
        // Returning false in case of an error
        return false;
    }
}

/**
 * Compares a password with a hashed password from the database.
 * @param {string} password - Plain text password.
 * @param {string} hashedPasswordFromDB - Hashed password retrieved from the database.
 * @returns {boolean} - Returns true if the password matches the hashed password, otherwise returns false.
 */
async function CheckIfPasswordMatch(password, hashedPasswordFromDB) {
    try {
        // Comparing the provided password with the hashed password from the database
        const isPasswordMatch = await bcrypt.compare(password, hashedPasswordFromDB);
        // Returning the result of the comparison
        return isPasswordMatch;
    } catch (error) {
        // Handling errors if any occur during the password comparison
        console.error("Error comparing passwords:", error);
    }
}

async function GetUserId(data) {
    try {
        // Establishing a database connection
        const conn = await mariadb.pool.getConnection();
        // Executing the SQL query to check if the email address exists
        const result = await conn.query("SELECT id FROM user WHERE mail = ? OR username = ?", [data, data]);
        // Releasing the database connection
        conn.release();
        return result[0].id;
    } catch (error) {
        // Handling errors if any occur during the password comparison
        console.error("Error retrieving userId:", error);
    }
}

async function CheckIfDiscordAccount(data){
    try{
        const conn = await mariadb.pool.getConnection();
        const result = await conn.query("SELECT discordAccount FROM user WHERE mail = ?", data);
        conn.release();
        if (result[0] == null){
            return false
        } else{
            return true
        }
    }catch (error) {
        // Handling errors
        console.error("Error checking discordAccount:", error);
    }
}

async function ModifyDiscordStatus(data){
    try{
        const conn = await mariadb.pool.getConnection();
        await conn.query("UPDATE user SET discordAccount = 1 WHERE mail = ?", data);
        conn.release();
    }catch (error) {
        // Handling errors
        console.error("Error modifying discord status: ", error);
    }
}






// Exporting all functions for use in other modules
module.exports = {InsertUser, CheckIfMailExist, CheckIfUsernameExist, CheckIfPasswordMatch, GetPasswordFromUsernameOrEmail, GetUserId, CheckIfDiscordAccount, ModifyDiscordStatus, InsertDiscordUser};
