const express = require('express');
const router = express.Router();

const { subscriptionListMenu } = require('./controllerSubscriptionListMenu.js');
const { timelineRequest } = require('./controllerTimelineRequest.js');
const { subscriptionTimelineRequest } = require('./controllerSubscriptionTimelineRequest.js');
const { addViewTimelineRequest } = require('./controllerAddViewVideoTimeline.js');
const { addHistoryRequest } = require('./controllerAddHistory.js');
const { historyRequest } = require('./controllerHistory.js');
const { subscriptionList } = require('./controllerSubscriptionList.js');
const { viewedCategoriesList } = require('./controllerViewedCategoriesList.js');
const { playlistRequest } = require('./controllerPlaylist.js');
const { showPlaylistRequest } = require('./controllerShowPlaylist.js');
const { likePageYouRequest } = require('./controllerLikePageYou.js');
console.log("router timeline");

// Get the videos infos to show timeline
router.get('/timeline-request', timelineRequest)

// Get the videos infos to show timeline subscriptions
router.get('/subscription-timeline-request', subscriptionTimelineRequest)

// Get the list of subscriptions
router.get('/subscribe-list-request', subscriptionList)

// Get the list of viewed categories
router.get('/viewed-categories-list-request', viewedCategoriesList)

// Add view to video with video_id
router.get('/addView-request/:videoId', addViewTimelineRequest)

// Get the list of subscriptions
router.get('/subscribe-list-request-menu', subscriptionListMenu)

router.get('/addHistory-request/:videoId', addHistoryRequest)

router.get('/history-request', historyRequest)

router.get('/playlist-request', playlistRequest)

router.get('/showPlaylist-request', showPlaylistRequest)

router.get('/likePageYou-request', likePageYouRequest)

module.exports = router