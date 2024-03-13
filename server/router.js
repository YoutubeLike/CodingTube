//Don't touch this file

const express = require('express');
const app = express();
const router = express.Router();

const live = require('./live/router')

router.use('/live', live)
router.use('/profil', live)
router.use('/channel', live)
router.use('/timeline', live)
router.use('/short', live)
router.use('/search', live)


module.exports = router