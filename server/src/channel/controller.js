//Connexion à la Bdd
const mariadb = require("../src/database");

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
const selectChannelIdentifier= (req, res) => {
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
	selectChannelIdentifier,
	selectId,
	videoOnTab,
	NumberVideo,
	submitChannel,
	submitVideo,
	selectVideo,
	UserChannel,
};
