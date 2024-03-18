// Import de express
const express = require('express');

// Utilisation du router de Express
const router = express.Router();

// Import des fonctions
const { test, selectChannel, submit, submitData} = require('./controller')

// Configuration de la route POST pour la soumission des données
router.post('/submitData', submitData);

// Autres routes...
router.get('/test', test);
router.get('/infos', selectChannel);
router.get('/request/:submit', submit);

module.exports = router;
