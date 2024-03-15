const express = require('express');
const router = express.Router();

const { shortRequest } = require('./controller.js')
const { getIds } = require('./addShort.js')

router.get('/short-request', shortRequest)
router.get('/get-ids', getIds)

module.exports = router