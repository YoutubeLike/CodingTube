// Import de express
const express = require("express");

// Utilisation du router de Express
const router = express.Router();

// Import des fonctions
const { test, selectChannel, video } = require("./controller");

// Configuration de la route
router.get("/test", test);
router.get("/infos", selectChannel);
router.get("/video", video);

module.exports = router;
