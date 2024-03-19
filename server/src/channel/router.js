// Import de express
const express = require("express");

// Utilisation du router de Express
const router = express.Router();

// Import des fonctions
const { selectChannel, videoOnTab, NumberVideo } = require("./controller");

// Configuration de la route
router.get("/infos", selectChannel);
router.get("/videos", videoOnTab);
router.get("/nombreVideo", NumberVideo);

module.exports = router;
