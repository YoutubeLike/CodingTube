const express = require('express');
const router = express.Router();

const { timelineRequest } = require('./controllerTimelineRequest.js')
const { subscriptionTimelineRequest } = require('./controllerSubscriptionTimelineRequest.js')
const { addViewTimelineRequest } = require('./controllerAddViewVideoTimeline.js')

console.log("router timeline");

// Get the videos infos to show timeline
router.get('/timeline-request', timelineRequest)

// Get the videos infos to show timeline subscriptions
router.get('/subscription-timeline-request', subscriptionTimelineRequest)

// Add view to video with video_id
router.get('/addView-request/:videoId', addViewTimelineRequest)
module.exports = router