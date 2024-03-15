const express = require('express');
const router = express.Router();

const { submit } = require('./controller.js')

router.get('/:submit', submit)

module.exports = router