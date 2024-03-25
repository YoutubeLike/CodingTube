// Connexion à la Bdd
const mariadb = require('../src/database');

const test = ((_, res) => {
  res.send('Ouai ouai ça dit quoi ?')
});

// Récupérer des infos sur la chaîne
const selectChannel = (_, res) => {
	mariadb.pool.query("SELECT pseudo, nb_follower, bio, banner FROM channel WHERE user_id = 1")
		.then((value) => {
			res.send(value[0]);
		});
};

const getNbFollowers = ((req, res) => {
	mariadb.pool.query('SELECT * FROM follow WHERE channel_id=?', [req.query.channelId])
		.then((result) => {
			res.send(result)
		})
	}
);

const getFollow = ((req, res) => {
	mariadb.pool.query('SELECT * FROM follow WHERE channel_id=? AND follower_id=?', [req.query.channelId, req.query.userId])
		.then((result) => {
			res.send(result[0])
		})
	}
);
// ABONNEMENT //
// Ajout ou enlèvement d'un abonnement 
const follow = ((req, res) => {
	mariadb.pool.query('SELECT * FROM follow WHERE channel_id=? AND follower_id=?', [req.query.channelId, req.query.userId])
		.then((result) => {
			if (result[0]) {
				mariadb.pool.query('DELETE FROM follow WHERE channel_id = ? AND follower_id = ?', [req.query.channelId, req.query.userId])
					.then(() => {
						res.status(200).send("Données supprimées avec succès !");
					})
					.catch(error => {
						console.error("Erreur lors de la soumission des données :", error);
						res.status(500).send("Une erreur est survenue lors de la soumission des données.");
					});
			} else {
				mariadb.pool.query('INSERT INTO follow (channel_id, follower_id) VALUES (?, ?)', [req.query.channelId, req.query.userId])
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

// Récupérer des informations sur la vidéo

const selectVideo = ((_, res) => {
	mariadb.pool.query('SELECT title, description, channel_id, upload_video_url, upload_date_time, number_view, nb_comment, nb_like FROM video WHERE channel_id = 1').then((value) => {
		res.send(value[0])
	})
})
const submit = (req, res) => {
	const { name, identifier, bio } = req.body
	mariadb.pool.query("INSERT INTO channel (user_id, pseudo, identifier_channel, nb_follower, bio) VALUES (1, ?, ?, 0, ?)", [name, identifier, bio])
		.then(() => {
			res.status(200).send('Chaîne créer')
		})
}

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
	console.log('Données reçues :', title, description); // Ajoutez cette ligne pour vérifier les données reçues

	mariadb.pool.query('INSERT INTO video (title, description, category) VALUES (?, ?, ?)', [title, description, category])
		.then(() => {
			res.status(200).send("Données soumises avec succès !");
		})
		.catch(error => {
			console.error("Erreur lors de la soumission des données :", error);
			res.status(500).send("Une erreur est survenue lors de la soumission des données.");
		});
};

//Permet d'exporter les fonctions
module.exports = {
	selectChannel,
	videoOnTab,
	NumberVideo,
	submit,
	submitVideo,
	selectVideo,
	getNbFollowers,
	getFollow,
	follow,
};

















