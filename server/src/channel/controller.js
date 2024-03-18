// Connexion à la Bdd
const mariadb = require("../src/database");

const test = (_, res) => {
	res.send("Ouai ouai ça dit quoi ?");
};

// Récupérer des infos sur la chaîne
const selectChannel = (_, res) => {
	mariadb.pool
		.query("SELECT pseudo, nb_follower, bio FROM channel WHERE user_id = 1")
		.then((value) => {
			res.send(value[0]);
		});
};

const submit = (req, res) => {
	const submitValue = req.params.submit;

	console.error("Valeur soumise :", submitValue);
};

const video = (_, res) => {
	mariadb.pool
		.query("SELECT channel_id, upload_video_url, title WHERE user_id = 1")
		.then((value) => {
			res.send(value[0]);
		});
};

// Permet d'exporter les fonctions
module.exports = {
	test,
	selectChannel,
	submit,
	video,
};
