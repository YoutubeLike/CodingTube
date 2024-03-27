const mariadb = require("../src/database");
const fs = require('fs');
const path = require('path');

const cors = require('cors');
const multer = require('multer');

const express = require('express');
const app = express();
app.use(cors);
app.use(express.json);

const getNbFollowers = ((req, res) => {
    mariadb.pool.query('SELECT * FROM follow WHERE channel_id=?', [req.query.channelId])
        .then((result) => {
            res.send(result)
        })
}
);

const getFollow = ((req, res) => {
    console.log([req.query.channelId, req.session.userId])
    mariadb.pool.query('SELECT * FROM follow WHERE channel_id=? AND follower_id=?', [req.query.channelId, req.session.userId])
        .then((result) => {
            res.send(result[0])
        })
}
);
// ABONNEMENT //
// Ajout ou enlèvement d'un abonnement 
const follow = ((req, res) => {
    mariadb.pool.query('SELECT * FROM follow WHERE channel_id=? AND follower_id=?', [req.query.channelId, req.session.userId])
        .then((result) => {
            if (result[0]) {
                mariadb.pool.query('DELETE FROM follow WHERE channel_id = ? AND follower_id = ?', [req.query.channelId, req.session.userId])
                    .then(() => {
                        res.status(200).send("Données supprimées avec succès !");
                    })
                    .catch(error => {
                        console.error("Erreur lors de la soumission des données :", error);
                        res.status(500).send("Une erreur est survenue lors de la soumission des données.");
                    });
            } else {
                mariadb.pool.query('INSERT INTO follow (channel_id, follower_id) VALUES (?, ?)', [req.query.channelId, req.session.userId])
                    .then(() => {
                        res.status(200).send("Données insérées avec succès !");
                    })
                    .catch(error => {
                        console.error("Erreur lors de la soumission des données :", error);
                        res.status(500).send("Une erreur est survenue lors de la soumission des données.");
                    });
            }
        })
}
);


const source = path.join(__dirname, "../../../..", "uploads")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'thumbnail') {
            cb(null, path.join(source, "thumbnails"));
        } else if (file.fieldname === 'video') {
            cb(null, path.join(source, "videos"));
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const uploadVideo = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]);

const submit = (req, res) => {
    const { name, identifier, bio } = req.body;
    mariadb.pool.query("INSERT INTO channel (user_id, pseudo, identifier_channel, nb_follower, bio) VALUES (1, ?, ?, 0, ?)", [name, identifier, bio])
        .then(() => {
            res.status(200).send('Chaîne créée');
        })
        .catch(error => {
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

        const { title, description, category } = req.body;
        const thumbnailFile = req.files['thumbnail'][0];
        const videoFile = req.files['video'][0];

        // Sécurité si aucune vidéo, fichier
        if (!thumbnailFile || !videoFile) {
            console.error("No thumbnail or video file selected");
            return res.status(400).send("No thumbnail or video file selected");
        }

        const thumbnailURL = path.join(source, "thumbnails", thumbnailFile.originalname)
        const videoURL = path.join(source, "/videos/", videoFile.originalname)

        mariadb.pool.query('INSERT INTO video (title, description, category, thumbnail, upload_video_url) VALUES (?, ?, ?, ?, ?)', [title, description, category, thumbnailURL, videoURL])
            .then(() => {
                res.status(200).send("Data submitted successfully!");
            })
            .catch(error => {
                console.error("Error submitting video:", error);
                res.status(500).send("An error occurred while submitting video data.");
            });
    })
}

const UserChannel = async (_, res) => {
    try {
        const userData = "tokenId"; // Remplacez "NomUtilisateur" par la valeur appropriée

        // Obtenez l'ID de l'utilisateur en utilisant GetUserId avec les données fournies
        const isLoggedIn = await GetUserId(userData);

        // Si l'ID de l'utilisateur est trouvé avec succès
        if (isLoggedIn) {
            // Exécutez la requête SQL pour récupérer les informations du canal associé à cet utilisateur
            const result = await mariadb.pool.query(
                "SELECT pseudo, nb_follower, bio, banner FROM channel WHERE user_id = ?",
                [isLoggedIn]
            );

            // Envoyez les informations du canal en réponse
            res.send(result[0]);
        } else {
            // Si aucun ID d'utilisateur n'a été trouvé, renvoyez une réponse appropriée
            res.send("Aucun utilisateur trouvé avec les informations fournies.");
        }
    } catch (error) {
        // Si une erreur se produit à n'importe quelle étape, capturez-la et envoyez une réponse d'erreur appropriée
        console.log(
            "Erreur lors de la récupération des informations du canal:",
            error
        );
        res
            .status(500)
            .send(
                "Une erreur s'est produite lors de la récupération des informations du canal."
            );
    }
};

// Récupérer des infos sur la chaîne
const selectChannel = (req, res) => {
    const id = req.query.idChannel;
    mariadb.pool
        .query("SELECT * FROM channel WHERE id = ?", [id])
        .then((value) => {
            res.send(value[0]);
        });
};

// Récupérer des infos sur la chaîne à partir d'un identifiant @
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

// Récupérer l'id à partir de l'identifier
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

// Récupérer des informations sur la vidéo
const selectVideo = (req, res) => {
    const id = req.query.idVideo;
    mariadb.pool.query("SELECT * FROM video WHERE id = ?", [id]).then((value) => {
        res.send(value[0]);
    });
};

const submitChannel = async (req, res) => {
    const { name, identifier, bio, banner, profile_picture } = req.body;
    const isIdentifierAvailable = await mariadb.pool.query(
        "SELECT identifier_channel FROM channel WHERE identifier_channel = ?",
        [identifier]
    );

    if (isIdentifierAvailable[0] == null) {
        mariadb.pool
            .query(
                "INSERT INTO channel (user_id, pseudo, identifier_channel, nb_follower, bio, banner, profile_picture) VALUES (1, ?, ?, 0, ?, ?, ?)",
                [name, identifier, bio, banner, profile_picture]
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

//Récupère les vidéos postées pour l'onglet vidéo de la chaîne
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


//Récupère le nombre de vidéo mise en ligne
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

module.exports = {
    selectChannel,
    selectChannelIdentifier,
    submit,
    selectId,
    videoOnTab,
    NumberVideo,
    submitChannel,
    submitVideo,
    selectVideo,
    UserChannel,
    getNbFollowers,
    getFollow,
    follow,
};