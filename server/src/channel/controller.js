//Connection to the database
const mariadb = require("../src/database");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const express = require("express");
const app = express();

app.use(express.json);

// Get the number of users subscribed to a channel
const getNbFollowers = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM follow WHERE channel_id=?", [req.query.channelId])
    .then((result) => {
      res.send(result);
    });
};

const getFollow = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM follow WHERE channel_id=? AND follower_id=?", [
      req.query.channelId,
      req.query.userId,
    ])
    .then((result) => {
      res.send(result[0]);
    });
};
// ABONNEMENT //
// Ajout ou enlèvement d'un abonnement
const follow = (req, res) => {
  mariadb.pool
    .query("SELECT * FROM follow WHERE channel_id=? AND follower_id=?", [
      req.query.channelId,
      req.query.userId,
    ])
    .then((result) => {
      if (result[0]) {
        mariadb.pool
          .query(
            "DELETE FROM follow WHERE channel_id = ? AND follower_id = ?",
            [req.query.channelId, req.query.userId]
          )
          .then(() => {
            res.status(200).send("Données supprimées avec succès !");
          })
          .catch((error) => {
            console.error("Erreur lors de la soumission des données :", error);
            res
              .status(500)
              .send(
                "Une erreur est survenue lors de la soumission des données."
              );
          });
      } else {
        mariadb.pool
          .query("INSERT INTO follow (channel_id, follower_id) VALUES (?, ?)", [
            req.query.channelId,
            req.query.userId,
          ])
          .then(() => {
            res.status(200).send("Données insérées avec succès !");
          })
          .catch((error) => {
            console.error("Erreur lors de la soumission des données :", error);
            res
              .status(500)
              .send(
                "Une erreur est survenue lors de la soumission des données."
              );
          });
      }
    });
};

// PAth to docker source
const source = path.join(__dirname, "../../../..", "uploads");

const date = Date.now();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "thumbnail") {
      cb(null, path.join(source, "thumbnails"));
    } else if (file.fieldname === "video") {
      cb(null, path.join(source, "videos"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${date}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const uploadVideo = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

const submit = (req, res) => {
  const { name, identifier, bio } = req.body;
  mariadb.pool
    .query(
      "INSERT INTO channel (user_id, pseudo, identifier_channel, nb_follower, bio) VALUES (1, ?, ?, 0, ?)",
      [name, identifier, bio]
    )
    .then(() => {
      res.status(200).send("Chaîne créée");
    })
    .catch((error) => {
      console.error("Error submitting channel info:", error);
      res.status(500).send("Internal Server Error");
    });
};

const submitVideo = (req, res) => {
  uploadVideo(req, res, (err) => {
    if (err) {
      console.error("Error uploading files:", err);
      return res.status(500).send("Internal Server Error");
    }

    const { title, description, category, isShort, text, filters } = req.body;
    const thumbnailFile = req.files["thumbnail"][0];
    const videoFile = req.files["video"][0];

    // Sécurité si aucune vidéo ou fichier n'a été sélectionné
    if (!thumbnailFile || !videoFile) {
      console.error("No thumbnail or video file selected");
      return res.status(400).send("No thumbnail or video file selected");
    }

    const thumbnailURL = path.join(
      source,
      "thumbnails",
      `${date}_${thumbnailFile.originalname}`
    );
    const videoURL = path.join(
      source,
      "videos",
      `${date}_${videoFile.originalname}`
    );

    if (isShort == "true") {
      mariadb.pool
        .query(
          "INSERT INTO short (title, description, category, thumbnail, upload_video_url, channel_id, text, filters, upload_date_time) VALUES (?, ?, ?, ?, ?, 1, ?, ?, CURRENT_TIMESTAMP)",
          [title, description, category, thumbnailURL, videoURL, text, filters]
        )
        .then(() => {
          res.status(200).send("Data submitted successfully!");
        })
        .catch((error) => {
          console.error("Error submitting video:", error);
          res
            .status(500)
            .send("An error occurred while submitting video data.");
        });
    } else {
      mariadb.pool
        .query(
          "INSERT INTO video (title, description, category, thumbnail, upload_video_url, channel_id, upload_date_time) VALUES (?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP)",
          [title, description, category, thumbnailURL, videoURL]
        )
        .then(() => {
          res.status(200).send("Data submitted successfully!");
        })
        .catch((error) => {
          console.error("Error submitting video:", error);
          res
            .status(500)
            .send("An error occurred while submitting video data.");
        });
    }
  });
};

// Permet de s'identifier vers la chaîne
const getIdentifier = (req, res) => {
  console.log(req.session.userId);
  mariadb.pool
    .query("SELECT identifier_channel FROM channel WHERE id = ?", [
      req.session.userId,
    ])
    .then((value) => {
      res.send(value[0]);
    });
};

// Retrieve channel information
const selectChannel = (req, res) => {
  const id = req.query.idChannel;
  mariadb.pool
    .query("SELECT * FROM channel WHERE id = ?", [id])
    .then((value) => {
      res.send(value[0]);
    });
};

// Retrieve channel info from an @ ID
const selectChannelIdentifier = (req, res) => {
  const identifier = req.query.identifier;
  mariadb.pool
    .query(
      "SELECT id, pseudo, nb_follower, bio, banner FROM channel WHERE identifier_channel = ?",
      [identifier]
    )
    .then((value) => {
      res.send(value[0]);
    });
};

// Get id from identifier
const selectId = (req, res) => {
  const identifier = req.query.identifier;
  mariadb.pool.query("SELECT id FROM channel WHERE identifier_channel = ?", [
    identifier,
  ]);
  const id = req.query.idChannel;
  mariadb.pool
    .query("SELECT * FROM channel WHERE id = ?", [id])
    .then((value) => {
      res.send(value[0]);
    });
};

// Retrieve video information
const selectVideo = (req, res) => {
  const id = req.query.idVideo;
  mariadb.pool.query("SELECT * FROM video WHERE id = ?", [id]).then((value) => {
    res.send(value[0]);
  });
};

const submitChannel = async (req, res) => {
  const userId = req.session.userId;
  const isIdentifierAvailable = await mariadb.pool.query(
    "SELECT identifier_channel FROM channel WHERE identifier_channel = ?",
    [req.query.identifier]
  );

  if (isIdentifierAvailable[0] == null) {
    mariadb.pool
      .query(
        "INSERT INTO channel (user_id, pseudo, identifier_channel, nb_follower, bio, banner, profile_picture) VALUES (?, ?, ?, 0, ?, ?, ?)",
        [
          userId,
          req.query.name,
          req.query.identifier,
          req.query.bio,
          req.query.banner,
          req.query.profile_picture,
        ]
      )
      .then(() => {
        res.status(200).send("Channel created");
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    res.status(200).send("Identifiant déjà utilisé");
  }
};

//Retrieves posted videos for the channel's video tab
const videoOnTab = (req, res) => {
  const idVideoOnTab = req.query.idVideoOnTab;
  mariadb.pool
    .query("SELECT * FROM video WHERE channel_id = ?", [idVideoOnTab])
    .then((value) => {
      res.send(value);
    })
    .catch((error) => {
      console.error("Error executing query", error);
      res.status(500).send("An error occurred while fetching the data.");
    });
};

//Retrieves the number of videos uploaded
const NumberVideo = (req, res) => {
  const numberVideo = req.query.numberVideo;
  mariadb.pool
    .query("SELECT * FROM video WHERE channel_id = ?", [numberVideo])
    .then((result) => {
      // Envoyer la réponse
      res.send(result);
    })
    .catch((error) => {
      // Gérer les erreurs
      console.error("Error executing SQL query:", error);
      res.status(500).send("Internal Server Error");
    });
};

const getVideo = (req, res) => {
  const videoId = req.query.idVideo;
  console.log(videoId);

  mariadb.pool
    .query("SELECT upload_video_url FROM video WHERE id = ?", [videoId])
    .then((result) => {
      if (result.length > 0) {
        const videoPath = result[0].upload_video_url;
        console.log(videoPath);
        console.log("VIDEO PATH : " + videoPath);
        // Lire la vidéo depuis le chemin du fichier ou l'URL
        const videoStream = fs.createReadStream(
          path.join(__dirname, "../../../..", videoPath)
        );
        // Définir les en-têtes appropriés pour la réponse
        res.setHeader("Content-Type", "video/mp4"); // Définir le type de contenu de la vidéo
        videoStream.pipe(res); // Envoyer la vidéo en tant que flux dans le corps de la réponse HTTP
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

//export functions
module.exports = {
  getIdentifier,
  selectChannel,
  selectChannelIdentifier,
  submit,
  selectId,
  videoOnTab,
  NumberVideo,
  submitChannel,
  submitVideo,
  selectVideo,
  getNbFollowers,
  getFollow,
  follow,
  getVideo,
};
