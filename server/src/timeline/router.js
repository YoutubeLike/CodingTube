const express = require('express');
const router = express.Router();

const { timelineRequest } = require('./controllerTimelineRequest.js');
const { subscriptionTimelineRequest } = require('./controllerSubscriptionTimelineRequest.js');
const { addViewTimelineRequest } = require('./controllerAddViewVideoTimeline.js');
const { addHistoryRequest } = require('./controllerAddHistory.js');
const { historyRequest } = require('./controllerHistory.js');

console.log("router timeline");

// Get the videos infos to show timeline
router.get('/timeline-request', timelineRequest)

// Get the videos infos to show timeline subscriptions
router.get('/subscription-timeline-request', subscriptionTimelineRequest)

// Add view to video with video_id
router.get('/addView-request/:videoId', addViewTimelineRequest)

router.get('/addHistory-request/:videoId', addHistoryRequest)

router.get('/history-request', historyRequest)

module.exports = router