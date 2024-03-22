const mariadb = require("mariadb");
const dotenv = require("dotenv");
dotenv.config();

var pool = mariadb.createPool({
  host: "bdd",
  user: "admin",
  password: "admin",

  database: "coditube",
});

module.exports = Object.freeze({
  pool: pool,
});
