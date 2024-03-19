// Import de express
const express = require('express');

// Utilisation du router de Express
const router = express.Router();

// Import des fonctions
const { test, selectChannel, submit } = require('./controller')

// Configuration de la route
router.get('/test', test)
router.get('/infos', selectChannel)
router.post('/submitChannel', submit)

module.exports = router
