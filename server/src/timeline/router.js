const express = require('express');
const router = express.Router();

const { timelineRequest } = require('./controllerTimelineRequest.js')
const { addViewTimelineRequest } = require('./controllerAddViewVideoTimeline.js')
const { subscriptionListMenu } = require('./controllerSubscriptionListMenu.js');

console.log("router timeline");

// Get the videos infos to show timeline
router.get('/timeline-request', timelineRequest)

// Add view to video with video_id
router.get('/addView-request/:videoId', addViewTimelineRequest)

// Get the list of subscriptions
router.get('/subscribe-list-request-menu', subscriptionListMenu)

module.exports = router