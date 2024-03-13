const mariadb = require('mariadb');
const dotenv = require('dotenv');
dotenv.config();

var pool = mariadb.createPool({
    host: 'bdd', 
    user: process.env.BDD_USER, 
    password: process.env.BDD_PASSWORD,
    
    database: "coditube"
});

module.exports = Object.freeze({
    pool: pool
})
