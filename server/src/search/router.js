const express = require('express');
const router = express.Router();

const { submit } = require('./submit.js')


router.get('/request/:submit', submit)


module.exports = router