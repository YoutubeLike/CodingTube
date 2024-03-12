const mariadb = require('mariadb');

var pool = mariadb.createPool({
    host: 'bdd', 
    user:'admin', 
    password: 'admin',
    database: "coditube"
});

module.exports = Object.freeze({
    pool: pool
})
