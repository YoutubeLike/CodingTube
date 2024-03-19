const express = require('express');
const router = express.Router();

const { submit } = require('./submit.js')
const { mostResearch } = require('./mostResearch.js')
const {history} = require('./history.js')
const { deleteHistory } = require('./deleteHistory.js')

router.get('/request/:submit', submit)
router.get("/mostResearch", mostResearch)
router.get('/history/:history', history)
router.get('/deleteHistory/:deleteHistory', deleteHistory)  

module.exports = router