const express = require("express");
const router = express.Router();

const { premium } = require("./controller.js");

router.get("/premium", premium);

module.exports = router;
