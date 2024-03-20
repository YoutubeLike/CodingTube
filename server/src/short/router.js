const express = require("express");
const router = express.Router();

const {
  shortRequest,
  getLikes,
  updateLike,
  getDislikes,
  updateDislike,
} = require("./controller.js");

const { checkLike, addLike } = require("./likeManager.js");

router.get("/short-request", shortRequest);
router.get("/get-likes", getLikes);
router.get("/update-like", updateLike);
router.get("/get-dislikes", getDislikes);
router.get("/update-dislike", updateDislike);

router.get("/check-like", checkLike);
router.get("/add-like", addLike);

module.exports = router;
