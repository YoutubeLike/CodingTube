const express = require("express");
const router = express.Router();

const {
  getTenNextShorts,
  getShortInfos,
  getShortVideo,
  getShortLikes,
  getShortDislikes,
  getComments,
  getReplies,
  addView,
} = require("./getShortInfos.js");

const {
  checkShortLike,
  addShortLike,
  removeShortLike,
  checkShortDislike,
  addShortDislike,
  removeShortDislike,
} = require("./likeManager.js");

const {
  addCommentAndGetId,
  addReplyAndGetId,
  getCommentInfos,
  getCommentLikes,
  getCommentDislikes,
  checkShortCommentLike,
  addShortCommentLike,
  removeShortCommentLike,
  checkShortCommentDislike,
  addShortCommentDislike,
  removeShortCommentDislike,
} = require("./commentsManager.js");

const { getFollow, follow } = require("./subsciptionManager.js");

router.get("/get-ten-next-shorts", getTenNextShorts);
router.get("/get-short-infos", getShortInfos);
router.get("/get-short-video", getShortVideo);
router.get("/get-short-likes", getShortLikes);
router.get("/get-short-dislikes", getShortDislikes);
router.get("/get-short-comments", getComments);
router.get("/get-short-replies", getReplies);
router.get("/add-view", addView);

router.get("/check-short-like", checkShortLike);
router.get("/add-short-like", addShortLike);
router.get("/remove-short-like", removeShortLike);
router.get("/check-short-dislike", checkShortDislike);
router.get("/add-short-dislike", addShortDislike);
router.get("/remove-short-dislike", removeShortDislike);

router.get("/add-short-comment", addCommentAndGetId);
router.get("/add-short-reply", addReplyAndGetId);
router.get("/get-short-comment-infos", getCommentInfos);
router.get("/get-short-comment-likes", getCommentLikes);
router.get("/get-short-comment-dislikes", getCommentDislikes);
router.get("/check-short-comment-like", checkShortCommentLike);
router.get("/add-short-comment-like", addShortCommentLike);
router.get("/remove-short-comment-like", removeShortCommentLike);
router.get("/check-short-comment-dislike", checkShortCommentDislike);
router.get("/add-short-comment-dislike", addShortCommentDislike);
router.get("/remove-short-comment-dislike", removeShortCommentDislike);

router.get("/get-follow", getFollow)
router.get("/follow", follow)

module.exports = router;
