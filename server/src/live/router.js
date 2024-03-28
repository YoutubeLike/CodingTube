const express = require('express');
const router = express.Router();


const { saveThumbnail, sendThumbnail, display, GetProfilPicture, GetUsername, GetTitle, generateLiveKey, getUserId, updateTitle, create, GetLiveKey  } = require('./controller.js');

router.post('/save', saveThumbnail)
router.get("/thumbnail", sendThumbnail)
router.get("/test", display)
router.get("/profile-picture", GetProfilPicture)
router.get("/username", GetUsername)
router.get("/title",GetTitle)
router.get("/testa", getUserId)
router.get("/LiveStreamKey", generateLiveKey)   
router.post("/streamManagerT", updateTitle)
router.get("/streamManagerK", GetLiveKey)
router.post("/updatetitle", updateTitle)
router.get("/create", create)


module.exports = router