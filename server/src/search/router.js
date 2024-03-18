const express = require('express');
const router = express.Router();

const { submit } = require('./submit.js')
const { mostResearch } = require('./mostResearch.js')

router.get('/request/:submit', submit)
router.get("/mostResearch", mostResearch)

module.exports = router