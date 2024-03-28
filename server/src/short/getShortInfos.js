const mariadb = require("../src/database");
const fs = require("fs");
const path = require("path");
const { videoOnTab } = require("../channel/controller");
const { Console } = require("console");

const getTenNextShorts = (req, res) => {
  mariadb.pool
    .query("SELECT id FROM short WHERE id > ? ORDER BY id ASC LIMIT 10", [
      req.query.currentId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const getShortInfos = (req, res) => {
  mariadb.pool
    .query(
      "SELECT short.id AS id, channel.id AS uploader_id, title, upload_date_time AS date, filters, text, description, number_view, pseudo, identifier_channel, PP FROM short JOIN channel ON channel_id = channel.id JOIN user ON channel.user_id = user.id WHERE short.id = ?;",
      [req.query.shortId]
    )
    .then((value) => {
      res.send(value[0]);
    });
};

const getShortVideo = (req, res) => {
  console.log(req.query.shortId);
  mariadb.pool
    .query("SELECT upload_video_url FROM short WHERE id = ?", [
      req.query.shortId,
    ])
    .then((result) => {
      if (result[0].upload_video_url != null && result[0].upload_video_url != "") {
        const videoPath = result[0].upload_video_url;
        console.log(
          "CHEMIN   " + path.join(__dirname, "../../../..", videoPath)
        );
        const videoStream = fs.createReadStream("../../../.." + videoPath);
        res.setHeader("Content-Type", "video/mp4");
        videoStream.pipe(res);
      } else {
        res.status(404).json({ message: "Vidéo non trouvée" });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de la vidéo :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération de la vidéo" });
    });
};

const getShortLikes = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM like_short WHERE id_short = ?;", [req.query.shortId])
    .then((value) => {
      res.send(value);
    });
};

const getShortDislikes = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM dislike_short WHERE id_short = ?;", [
      req.query.shortId,
    ])
    .then((value) => {
      res.send(value);
    });
};

const getComments = (req, res) => {
  mariadb.pool
    .query(
      "SELECT * FROM comment_short WHERE short_id = ? AND reply IS NULL;",
      [req.query.shortId]
    )
    .then((value) => {
      res.send(value);
    });
};

const getReplies = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM comment_short WHERE reply = ?;", [req.query.replyId])
    .then((value) => {
      res.send(value);
    });
};

const addView = (req, res) => {
  mariadb.pool
    .query("UPDATE short SET number_view = number_view + 1 WHERE id = ?;", [
      req.query.shortId,
    ])
    .then(() => {
      res.status(200).send("Data successfully updated");
    })
    .catch((error) => {
      console.error("Error while updating datas :", error);
      res.status(500).send("Error while updating datas");
    });
};

module.exports = {
  getTenNextShorts,
  getShortInfos,
  getShortVideo,
  getShortLikes,
  getShortDislikes,
  getComments,
  getReplies,
  addView,
};
