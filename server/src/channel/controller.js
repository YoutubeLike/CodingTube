//Connexion à la Bdd
const mariadb = require("../src/database");

//Récupérer des infos sur la chaîne
const selectChannel = (_, res) => {
	mariadb.pool
		.query(
			"SELECT pseudo, nb_follower, bio, identifier_channel FROM channel WHERE user_id = 2"
		)
		.then((value) => {
			res.send(value[0]);
		});
};

const submit = (req, res) => {
	const submitValue = req.params.submit;

	console.error("Valeur soumise :", submitValue);
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

//Permet d'exporter les fonctions
module.exports = {
	selectChannel,
	submit,
	videoOnTab,
	NumberVideo,
};
