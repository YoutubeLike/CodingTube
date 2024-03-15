const express = require('express');
const router = express.Router();

const { submit } = require('./submit.js')
const { search_history } = require('./search_history.js')

router.get('/request/:submit', submit)
router.get('/search_history', search_history)

module.exports = router