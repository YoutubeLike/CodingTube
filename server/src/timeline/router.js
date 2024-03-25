const express = require('express');
const router = express.Router();

const { timelineRequest } = require('./controllerTimelineRequest.js')
const { categoryTimelineRequest } = require('./controllerCategoryTimelineRequest.js')
const { addViewTimelineRequest } = require('./controllerAddViewVideoTimeline.js')
const { subscriptionListMenu } = require('./controllerSubscriptionListMenu.js');
const { subscriptionTimelineRequest } = require('./controllerSubscriptionTimelineRequest.js');
const { addHistoryRequest } = require('./controllerAddHistory.js');
const { historyRequest } = require('./controllerHistory.js');
const { subscriptionList } = require('./controllerSubscriptionList.js');
const { viewedCategoriesList } = require('./controllerViewedCategoriesList.js');
const { playlistRequest } = require('./controllerPlaylist.js');
const { showPlaylistRequest } = require('./controllerShowPlaylist.js');
console.log("router timeline");


// Get the videos infos to show timeline
router.get('/timeline-request', timelineRequest)

// Get the videos infos to show category's timeline
router.get('/category-request', categoryTimelineRequest)

// Get the videos infos to show timeline subscriptions
router.get('/subscription-timeline-request', subscriptionTimelineRequest)

// Get the list of subscriptions
router.get('/subscribe-list-request', subscriptionList)

// Get the list of viewed categories
router.get('/viewed-categories-list-request', viewedCategoriesList)

// Add view to video with video_id
router.get('/addView-request', addViewTimelineRequest)

// Get the list of subscriptions
router.get('/subscribe-list-request-menu', subscriptionListMenu)

router.get('/addHistory-request', addHistoryRequest)

router.get('/history-request', historyRequest)

router.get('/playlist-request', playlistRequest)

router.get('/showPlaylist-request', showPlaylistRequest)

module.exports = router