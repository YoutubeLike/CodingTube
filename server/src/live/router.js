const express = require('express');
const router = express.Router();

const { saveThumbnail, sendThumbnail } = require('./controller.js')

router.post('/save', saveThumbnail)
router.get("/thumbnail", sendThumbnail)


module.exports = router