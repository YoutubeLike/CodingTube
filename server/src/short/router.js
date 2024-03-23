const express = require("express");
const router = express.Router();

const {
  getTenNextShorts,
  getShortInfos,
  getShortLikes,
  getShortDislikes,
  getComments,
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
  getCommentInfos,
  getCommentLikes,
  checkShortCommentLike,
  addShortCommentLike,
  removeShortCommentLike,
  checkShortCommentDislike,
} = require("./commentsManager.js");

router.get("/get-ten-next-shorts", getTenNextShorts);
router.get("/get-short-infos", getShortInfos);
router.get("/get-short-likes", getShortLikes);
router.get("/get-short-dislikes", getShortDislikes);
router.get("/get-short-comments", getComments);

router.get("/check-short-like", checkShortLike);
router.get("/add-short-like", addShortLike);
router.get("/remove-short-like", removeShortLike);
router.get("/check-short-dislike", checkShortDislike);
router.get("/add-short-dislike", addShortDislike);
router.get("/remove-short-dislike", removeShortDislike);

router.get("/add-short-comment", addCommentAndGetId);
router.get("/get-short-comment-infos", getCommentInfos);
router.get("/get-short-comment-likes", getCommentLikes);
router.get("/check-short-comment-like", checkShortCommentLike);
router.get("/add-short-comment-like", addShortCommentLike);
router.get("/remove-short-comment-like", removeShortCommentLike);
router.get("/check-short-comment-dislike", checkShortCommentDislike);
module.exports = router;
