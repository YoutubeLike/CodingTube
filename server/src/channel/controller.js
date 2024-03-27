//Connection to the database
const mariadb = require("../src/database");

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

//export functions
module.exports = {
	getIdentifier,
	selectChannel,
	selectChannelIdentifier,
	selectId,
	videoOnTab,
	NumberVideo,
	submitChannel,
	submitVideo,
	selectVideo,
};
