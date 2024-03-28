const express = require('express');
const router = express.Router();

const { submit } = require('./submit.js')
const { mostResearch } = require('./mostResearch.js')
const { history } = require('./history.js')
const { deleteHistory } = require('./deleteHistory.js')
const { mostResearchOnChange} = require('./mostResearchOnChange.js')
const { historyOnChange } = require('./historyOnChange.js')
const { displaySearchPage } = require('./displaySearchPage.js')
const { filters } = require('./filters.js')
 

router.get('/request/:submit', submit)
router.get("/mostResearch", mostResearch)
router.get('/history', history)
router.get('/deleteHistory/:deleteHistory', deleteHistory)



router.get('/mostResearch_onChange/:researchInput', mostResearchOnChange)  
router.get('/history_onChange/:researchInput', historyOnChange)
router.get('/displaySearchPage/:researchInput', displaySearchPage)  
router.get('/filters/:buttonValue/:videoSearch', filters)



module.exports = router