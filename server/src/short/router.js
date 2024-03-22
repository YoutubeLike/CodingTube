const express = require("express");
const router = express.Router();

const {
  getShortsList,
  getShortInfos,
  getLikes,
  getDislikes,
  getComments,
} = require("./getShortInfos.js");

const {
  checkLike,
  addLike,
  removeLike,
  checkDislike,
  addDislike,
  removeDislike,
} = require("./likeManager.js");

const { addComment } = require("./commentsManager.js");

router.get("/get-shorts-list", getShortsList);
router.get("/get-short-infos", getShortInfos);
router.get("/get-likes", getLikes);
router.get("/get-dislikes", getDislikes);
router.get("/get-comments", getComments);

router.get("/check-like", checkLike);
router.get("/add-like", addLike);
router.get("/remove-like", removeLike);
router.get("/check-dislike", checkDislike);
router.get("/add-dislike", addDislike);
router.get("/remove-dislike", removeDislike);

router.get("/add-comment", addComment);

module.exports = router;
