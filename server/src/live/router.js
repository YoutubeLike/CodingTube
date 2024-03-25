const express = require('express');
const router = express.Router();

const { saveThumbnail, sendThumbnail, display, GetProfilPicture, GetUsername, test, generateLiveKey  } = require('./controller.js')

router.post('/save', saveThumbnail)
router.get("/thumbnail", sendThumbnail)
router.get("/test", display)
router.get("/profile-picture", GetProfilPicture)
router.get("/username", GetUsername)
router.get("/testa", test)
router.get("/LiveStreamKey", generateLiveKey)




module.exports = router