const express = require("express");
const router = express.Router();

const {
  getShortInfos,
} = require("./controller.js");

const {
  getLikes,
  checkLike,
  addLike,
  removeLike,
  getDislikes,
  checkDislike,
  addDislike,
  removeDislike,
} = require("./likeManager.js");

router.get("/short-request", getShortInfos);

router.get("/get-likes", getLikes);
router.get("/check-like", checkLike);
router.get("/add-like", addLike);
router.get("/remove-like", removeLike);
router.get("/get-dislikes", getDislikes);
router.get("/check-dislike", checkDislike);
router.get("/add-dislike", addDislike);
router.get("/remove-dislike", removeDislike);

module.exports = router;
