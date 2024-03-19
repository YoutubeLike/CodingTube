const express = require("express");
const router = express.Router();

const { livetest } = require("./controller.js");

router.get("/test/:user", livetest);

module.exports = router;
