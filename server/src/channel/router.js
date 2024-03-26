// Import de express
const express = require("express");

// Utilisation du router de Express
const router = express.Router();

const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors);
app.use(express.json);

// Import des fonctions
const {
	selectChannel,
	selectChannelIdentifier,
	selectId,
	videoOnTab,
	NumberVideo,
	submitChannel,
	submitVideo,
	selectVideo,
	UserChannel,
} = require("./controller");

// Configuration de la route
router.get("/infos", selectChannel);
router.get("/infosId", selectChannelIdentifier);
router.get("/id", selectId);
router.get("/video", selectVideo);
router.post("/submitChannel", submitChannel);
router.get("/videos", videoOnTab);
router.get("/nombreVideo", NumberVideo);
router.get("/userChannel", UserChannel);

// Configuration de la route POST pour la soumission des données
router.post('/submitVideo', submitVideo); // Utilisation de submitVideo comme middleware pour gérer les fichiers envoyés

module.exports = router;
