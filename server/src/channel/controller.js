const mariadb = require("../src/database");
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const source = path.join(__dirname, "../../../..", "uploads")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'thumbnail') {
            cb(null, path.join(source , "thumbnails"));
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
            return res.status(500).send(err.message);
		}

        const thumbnailFile = req.files['thumbnail'][0];
        const videoFile = req.files['video'][0];

		// Sécurité si aucune vidéo, fichier
        if (!thumbnailFile || !videoFile) {
            console.error("No thumbnail or video file selected");
            return res.status(400).send("No thumbnail or video file selected");
        }

		const thumbnailURL = '/uploads/thumbnails/' + thumbnailFile.originalname;
		const videoURL = '/uploads/videos/' + videoFile.originalname;

		mariadb.pool.query('INSERT INTO video (title, description, category, thumbnail, upload_video_url) VALUES (?, ?, ?, ?, ?)', [title, description, category, thumbnailURL, videoURL])
			.then(() => {
				res.status(200).send("Data submitted successfully!");
			})
			.catch(error => {
				console.error("Error submitting video:", error);
				res.status(500).send("An error occurred while submitting video data.");
			});
<<<<<<< Updated upstream
=======
	});
};

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
    
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======

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
>>>>>>> Stashed changes
};


