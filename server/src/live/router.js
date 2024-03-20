const express = require('express');
const router = express.Router();

const { saveThumbnail, sendThumbnail, display } = require('./controller.js')

router.post('/save', saveThumbnail)
router.get("/thumbnail", sendThumbnail)
router.get("/test", display)


module.exports = router