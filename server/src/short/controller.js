const mariadb = require("../src/database");

const shortRequest = (req, res) => {
  mariadb.pool
    .query("SELECT channel_id, title, description FROM short")
    .then((value) => {
      res.send(value[0]);
    });
};

module.exports = {
  shortRequest,
};
