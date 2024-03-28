const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const mariadb = require("/app/back/src/src/database.js");
const bcrypt = require("bcryptjs");

// Fonction pour vérifier si l'utilisateur est le streamer

// Permet de récupérer une image d'étiquette pour le stream
const saveThumbnail = (req, res) => {
  let user = req.body.user;
  const test = ffmpeg().input("http://live:8090/live/" + user + ".flv");
  test.inputOptions("-ss 00:00:01");
  test.outputOptions("-frames:v 1");

  test.save("/app/back/public/" + user + ".jpg");
  // res.sendFile("/app/back/public" + user + ".jpg");
};
// Permet d'envoyer une image d'étiquette pour le stream
const sendThumbnail = (req, res) => {
  console.log(fs.existsSync("/app/back/public/" + req.query.user + ".jpg"));
  if (fs.existsSync("/app/back/public/" + req.query.user + ".jpg")) {
    res.sendFile("/app/back/public/" + req.query.user + ".jpg");
  } else {
    res.sendFile("/app/back/src/public/default.png");
  }
};

// Requète pour la pp de la personne
const GetProfilPicture = async (req, res) => {
  const userId = req.session.userId;
  try {
    const connection = await mariadb.pool.getConnection();
    const result = await connection.query("SELECT pp FROM user WHERE id = ?", [
      userId,
    ]);
    connection.release();
    if (result.length > 0) {
      res.json({ profilePicture: result[0].pp });
    } else {
      res.json({ profilePicture: null });
    }
  } catch (err) {
    console.error(err);
    res.json({ profilePicture: null });
  }
};
// Requète pour l'username de l'utilisateur

const display = (req, res) => {
  res.sendFile("/app/back/src/public/follow.jpg");
};

const test = (req, res) => {
  console.log("Utilisateur " + req.session.userId);
  res.send("" + req.session.userId);
};
const GetUsername = async (req, res) => {
  const userId = req.session.userId;
  try {
    const connection = await mariadb.pool.getConnection();
    const result = await connection.query(
      "SELECT username FROM user WHERE id = ?",
      [userId]
    );
    connection.release();
    if (result.length > 0) {
      res.json({ pseudo: result[0].username });
      return { pseudo: result[0].username };
    } else {
      res.json({ pseudo: null });
    }
  } catch (err) {
    console.error(err);
    res.json({ pseudo: null });
  }
};
const GetUsernameAdmin = async (userId) => {
  try {
    const connection = await mariadb.pool.getConnection();
    const result = await connection.query(
      "SELECT username FROM user WHERE id = ?",
      [userId]
    );
    connection.release();
    if (result.length > 0) {
      return { pseudo: result[0].username }; // Retourner le pseudo trouvé
    } else {
      return { pseudo: null }; // Retourner null si aucun pseudo trouvé
    }
  } catch (err) {
    console.error(err);
    return { pseudo: null }; // Retourner null en cas d'erreur
  }
};
const adminDuLive = async (req, res) => {
  try {
    // Récupérer le pseudo de l'URL
    const streamer = req.query.streamer;
    console.log("Streamer from URL: " + streamer);

    // Récupérer le pseudo de l'utilisateur connecté
    const { pseudo } = await GetUsernameAdmin(req.session.userId);
    console.log("Connected User: " + pseudo);

    // Vérifier si les pseudos correspondent
    if (pseudo === streamer) {
      // Si le streamer est celui qui est connecté
      res.json({ isAdmin: true }); // Envoyer une réponse indiquant que c'est un admin
      console.log("The user is an admin.");
    } else {
      // Si ce n'est pas le streamer qui est connecté
      res.json({ isAdmin: false }); // Envoyer une réponse indiquant que ce n'est pas un admin
      console.log("The user is not an admin.");
    }
  } catch (error) {
    console.error("Error fetching admin status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Génère une clef de stream pour chaque utilisateur à la quel il peut stream dessus
const generateLiveKey = async (req, res) => {
  if (req.session.userId != undefined) {
    // vérifie que la session n'est pas vide
    // Permet de crée une clef de stream a l'id connecter
    mariadb.pool.query(
      "UPDATE channel set stream_key = '" +
        (await bcrypt.hash(Math.random().toString(36), 10)).replace("/", "") +
        "' WHERE user_id = '" +
        req.session.userId +
        "'"
    );
    res.send("Enregistré");
  } else {
    res.send("Vous n'êtes pas connecté");
  }
};

const banUser = async (req, res) => {
  const { sender, message } = req.query;
  try {
    const result = await banUser(sender, message);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in banUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  saveThumbnail,
  sendThumbnail,
  GetProfilPicture,
  GetUsername,
  display,
  test,
  generateLiveKey,
  adminDuLive,
  banUser,
};
