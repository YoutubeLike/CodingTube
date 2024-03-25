const express = require('express');
const router = express.Router();

const { submit } = require('./submit.js')
const { mostResearch } = require('./mostResearch.js')
const { history } = require('./history.js')
const { deleteHistory } = require('./deleteHistory.js')
const { mostResearch_onChange} = require('./mostResearch_onChange.js')
const { history_onChange } = require('./history_onChange.js')
const { displaySearchPage } = require('./displaySearchPage.js')


router.get('/request/:submit', submit)
router.get("/mostResearch", mostResearch)
router.get('/history', history)
router.get('/deleteHistory/:deleteHistory', deleteHistory)

router.get('/mostResearch_onChange/:researchInput', mostResearch_onChange)  
router.get('/history_onChange/:researchInput', history_onChange)
router.get('/displaySearchPage/:researchInput', displaySearchPage)  

module.exports = router