// Import de express
const express = require("express");

// Utilisation du router de Express
const router = express.Router();

// Import des fonctions
const { selectChannel, videoOnTab, NumberVideo, submit, submitVideo, selectVideo } = require("./controller");

// Configuration de la route
router.get('/infos', selectChannel)
router.get('/video', selectVideo)
router.post('/submitChannel', submit)
router.get("/videos", videoOnTab);
router.get("/nombreVideo", NumberVideo);

// Configuration de la route POST pour la soumission des données
router.post('/submitVideo', submitVideo); // Utilisation de submitVideo comme middleware pour gérer les fichiers envoyés


module.exports = router;
