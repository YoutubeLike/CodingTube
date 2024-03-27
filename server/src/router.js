//Don't touch this file
const express = require("express");
const router = express.Router();
const live = require("./live/router");
const short = require("./short/router");
const search = require("./search/router");
const timeline = require("./timeline/router");
const channel = require("./channel/router");
const profil = require("./profil/router");


router.use('/live', live)
router.use('/profil', profil)
router.use('/channel', channel)
router.use('/timeline', timeline)
router.use('/short', short)
router.use('/search', search)

module.exports = router;
