const express = require("express");
const router = express.Router();

const { timelineRequest } = require("./controllerTimelineRequest.js");
const { categoryTimelineRequest} = require("./controllerCategoryTimelineRequest.js");
const { addViewTimelineRequest } = require("./controllerAddViewVideoTimeline.js");
const { subscriptionListMenu } = require("./controllerSubscriptionListMenu.js");
const { subscriptionTimelineRequest } = require("./controllerSubscriptionTimelineRequest.js");
const { addHistoryRequest } = require("./controllerAddHistory.js");
const { historyRequest } = require("./controllerHistory.js");
const { subscriptionList } = require("./controllerSubscriptionList.js");
const { viewedCategoriesList } = require("./controllerViewedCategoriesList.js");
const { playlistRequest } = require("./controllerPlaylist.js");
const { playlistInfosRequest } = require("./controllerPlaylistInfos.js");
const { showPlaylistRequest } = require("./controllerShowPlaylist.js");
const { likePageYouRequest } = require("./controllerLikePageYou.js");
const { userInfo } = require("./controllerYouPage.js");
const { userName } = require("./controllerPseudoUser.js");
const { rightSideTimelineRequest } = require("./controllerRightSideTimeline.js");
const { yourVideosTimelineRequest } = require("./controllerYourVideosTimelineRequest.js");

// Get the videos infos to show timeline
router.get("/timeline-request", timelineRequest);

// Get the videos infos to show timeline by the userId
router.get("/yourVideos-request", yourVideosTimelineRequest);

// Get the videos infos to show category's timeline
router.get("/category-request", categoryTimelineRequest);

// Get the videos infos to show timeline subscriptions
router.get("/subscription-timeline-request", subscriptionTimelineRequest);

// Get the list of subscriptions
router.get("/subscribe-list-request", subscriptionList);

// Get the list of viewed categories
router.get("/viewed-categories-list-request", viewedCategoriesList);

// Add view to video with video_id
router.get("/addView-request", addViewTimelineRequest);

// Get the list of subscriptions
router.get("/subscribe-list-request-menu", subscriptionListMenu);

// Add the video to history
router.get("/addHistory-request", addHistoryRequest);

// Get the history's videos
router.get("/history-request", historyRequest);

// Get the playlists
router.get("/playlist-request", playlistRequest);

// Get the playlist's infos
router.get("/playlistInfos-request", playlistInfosRequest);

// Get the playlist's videos
router.get("/showPlaylist-request", showPlaylistRequest);

// Get the video's liked by userId
router.get("/likePageYou-request", likePageYouRequest);

// Get the infos of userId
router.get("/userInfo", userInfo);

// Get the username of userId
router.get("/userName", userName);

// Get the videos especially for right side timeline (not the same as timeline)
router.get("/rightSide-timeline", rightSideTimelineRequest);

module.exports = router;
