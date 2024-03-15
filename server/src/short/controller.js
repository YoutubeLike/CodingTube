const mariadb = require('../src/database')

const shortRequest = (req, res) => {
  mariadb.pool.query("SELECT id FROM short").then((value) => {
    res.send(value[0]);
  });
};

module.exports = {
  shortRequest,
};
