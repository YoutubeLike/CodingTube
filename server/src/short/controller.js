const mariadb = require("../src/database");

const shortRequest = (req, res) => {
  mariadb.pool
    .query("SELECT title, nb_like, nb_dislike, nb_comment, pseudo, description FROM short JOIN channel ON channel_id = channel.id;")
    .then((value) => {
      res.send(value[0]);
    });
};

module.exports = {
  shortRequest,
};
