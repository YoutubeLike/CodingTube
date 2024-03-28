const express = require('express');
const router = express.Router();

const { submit } = require('./submit.js')
const { mostResearch } = require('./mostResearch.js')
const { history } = require('./history.js')
const { deleteHistory } = require('./deleteHistory.js')
const { mostResearch_onChange} = require('./mostResearchOnChange.js')
const { history_onChange } = require('./historyOnChange.js')
const { displaySearchPage } = require('./displaySearchPage.js')
const { filters } = require('./filters.js')
 

router.get('/request/:submit', submit)
router.get("/mostResearch", mostResearch)
router.get('/history', history)
router.get('/deleteHistory/:deleteHistory', deleteHistory)


router.get('/mostResearch_onChange/:researchInput', mostResearch_onChange)  
router.get('/history_onChange/:researchInput', history_onChange)
router.get('/displaySearchPage/:researchInput', displaySearchPage)  
router.get('/filters/:buttonValue/:videoSearch', filters)


module.exports = router