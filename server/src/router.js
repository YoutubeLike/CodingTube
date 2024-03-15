//Don't touch this file

const express = require('express');
const app = express();
const router = express.Router();
const live = require('./live/router')
const short = require('./short/router')
const search = require('./search/router')
const timeline = require('./timeline/router')
const channel = require('./channel/router')
const profil = require('./profil/router')



console.log("router src");
router.use('/live', live)
router.use('/profil', live)
router.use('/channel', live)
router.use('/timeline', timeline)
router.use('/short', short)
router.use('/search', search)



module.exports = router