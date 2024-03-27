const mariadb = require("../src/database");
const fs = require('fs');
const path = require('path');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         if (file.fieldname === 'thumbnail') {
//             cb(null, path.join(__dirname, '..', '..', 'client', 'public', 'images'));
//         } else if (file.fieldname === 'video') {
//             cb(null, path.join(__dirname, '..', '..', 'client', 'public', 'videos'));
//         }
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

const getNbFollowers = ((req, res) => {
	mariadb.pool.query('SELECT * FROM follow WHERE channel_id=?', [req.query.channelId])
		.then((result) => {
			res.send(result)
		})
	}
);

const getFollow = ((req, res) => {
    console.log([req.query.channelId, req.session.userId])
	mariadb.pool.query('SELECT * FROM follow WHERE channel_id=? AND follower_id=?', [req.query.channelId,req.session.userId])
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

// const upload = multer({ storage: storage });

// const uploadVideo = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]);

const selectChannel = (_, res) => {
    mariadb.pool
        .query("SELECT pseudo, nb_follower, bio, banner FROM channel WHERE user_id = 1")
        .then((value) => {
            res.send(value[0]);
        })
        .catch(error => {
            console.error("Error retrieving channel info:", error);
            res.status(500).send("Internal Server Error");
        });
};

const selectVideo = (_, res) => {
    mariadb.pool.query('SELECT title, description, channel_id, upload_video_url, upload_date_time, number_view, nb_comment, nb_like FROM video WHERE channel_id = 1')
        .then((value) => {
            res.send(value[0]);
        })
        .catch(error => {
            console.error("Error retrieving video info:", error);
            res.status(500).send("Internal Server Error");
        });
};

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

        if (!thumbnailFile || !videoFile) {
            console.error("No thumbnail or video file selected");
            return res.status(400).send("No thumbnail or video file selected");
        }

        // Enregistrer la miniature
        const thumbnailPath = path.join(__dirname, '..', '..', 'client', 'public', 'images', thumbnailFile.originalname);
        thumbnailFile.mv(thumbnailPath, (err) => {
            if (err) {
                console.error("Error saving thumbnail:", err);
                return res.status(500).send("Internal Server Error");
            }

            // Enregistrer la vidéo
            const videoPath = path.join(__dirname, '..', '..', 'client', 'public', 'videos', videoFile.originalname);
            videoFile.mv(videoPath, (err) => {
                if (err) {
                    console.error("Error saving video:", err);
                    return res.status(500).send("Internal Server Error");
                }

                const thumbnailURL = '/images/' + thumbnailFile.originalname;
                const videoURL = '/videos/' + videoFile.originalname;

                mariadb.pool.query('INSERT INTO video (title, description, category, thumbnail, upload_video_url) VALUES (?, ?, ?, ?, ?)', [title, description, category, thumbnailURL, videoURL])
                    .then(() => {
                        res.status(200).send("Data submitted successfully!");
                    })
                    .catch(error => {
                        console.error("Error submitting video:", error);
                        res.status(500).send("An error occurred while submitting video data.");
                    });
            });
        });
    });
};



const videoOnTab = (_, res) => {
    mariadb.pool
        .query("SELECT id, channel_id, upload_video_url, title, number_view, upload_date_time, thumbnail FROM video WHERE channel_id = 1")
        .then((value) => {
            res.send(value);
        })
        .catch(error => {
            console.error("Error retrieving posted videos:", error);
            res.status(500).send("Internal Server Error");
        });
};

const NumberVideo = (_, res) => {
    mariadb.pool
        .query("SELECT COUNT(*) AS videoCount FROM video WHERE channel_id = 2")
        .then((result) => {
            const count = result[0].videoCount;
            res.json(count);
        })
        .catch((error) => {
            console.error("Error retrieving video count:", error);
            res.status(500).send("Internal Server Error");
        });
};

module.exports = {
    selectChannel,
    videoOnTab,
    NumberVideo,
    submit,
    submitVideo,
    selectVideo,
	getNbFollowers,
	getFollow,
	follow
};


