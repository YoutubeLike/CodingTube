//Connexion à la Bdd
const mariadb = require("../src/database");

// Récupérer des infos sur la chaîne
const selectChannel = (req, res) => {
	const identifier = req.query.identifier;
	mariadb.pool
		.query(
			"SELECT pseudo, nb_follower, bio, banner FROM channel WHERE identifier_channel = ?", [identifier]
		)
		.then((value) => {
			res.send(value[0]);
		});
};

// Récupérer l'id à partir de l'identifier
const selectId = (req, res) => {
	const identifier = req.query.identifier;
	mariadb.pool
		.query(
			"SELECT id FROM channel WHERE identifier_channel = ?", [identifier]
		)
		.then((value) => {
			res.send(value[0]);
		});
};

// Récupérer des informations sur la vidéo

const selectVideo = (_, res) => {
	mariadb.pool
		.query(
			"SELECT title, description, channel_id, upload_video_url, upload_date_time, number_view, nb_comment, nb_like FROM video WHERE channel_id = 1"
		)
		.then((value) => {
			res.send(value[0]);
		});
};

const submitChannel = async (req, res) => {
	const { name, identifier, bio, banner, profile_picture } = req.body;
	const isIdentifierAvailable = await mariadb.pool
		.query(
			"SELECT identifier_channel FROM channel WHERE identifier_channel = ?",
			[identifier]
		)

	if (isIdentifierAvailable[0] == null){
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

//Récupère les vidéos postées
const videoOnTab = (_, res) => {
	mariadb.pool
		.query(
			"SELECT id, channel_id, upload_video_url, title, number_view, upload_date_time, thumbnail FROM video WHERE channel_id = 1"
		)
		.then((value) => {
			res.send(value);
		});
};

//Récupère le nombre de vidéo mise en ligne
const NumberVideo = (_, res) => {
	mariadb.pool
		.query("SELECT COUNT (*) FROM video WHERE channel_id = 2")
		.then((result) => {
			// Récupérer la valeur du COUNT(*) depuis le résultat de la requête
			const count = result[0]["COUNT (*)"];

			// Convertir la valeur BigInt en nombre entier
			const countInt = Number(count);

			// Envoyer la réponse
			res.json(countInt);
		})
		.catch((error) => {
			// Gérer les erreurs
			console.error("Error executing SQL query:", error);
			res.status(500).send("Internal Server Error");
		});
};

const submitVideo = (req, res) => {
	const { title, description, category } = req.body;
	console.log("Données reçues :", title, description); // Ajoutez cette ligne pour vérifier les données reçues

	mariadb.pool
		.query(
			"INSERT INTO video (title, description, category, thumbnail) VALUES (?, ?, ?)",
			[title, description, category]
		)
		.then(() => {
			res.status(200).send("Données soumises avec succès !");
		})
		.catch((error) => {
			console.error("Erreur lors de la soumission des données :", error);
			res
				.status(500)
				.send("Une erreur est survenue lors de la soumission des données.");
		});
};

//Permet d'exporter les fonctions
module.exports = {
	selectChannel,
	selectId,
	videoOnTab,
	NumberVideo,
	submitChannel,
	submitVideo,
	selectVideo,
};
