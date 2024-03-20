const express = require("express");
const router = express.Router();

const { shortRequest, getLikes, updateLike, getDislikes, updateDislike } = require("./controller.js");

router.get("/short-request", shortRequest);
router.get("/get-likes", getLikes);
router.get("/update-like", updateLike);
router.get("/get-dislikes", getDislikes);
router.get("/update-dislike", updateDislike);

module.exports = router;