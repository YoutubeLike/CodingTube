const express = require("express");
const router = express.Router();

const { shortRequest } = require("./controller.js");

router.get("/short-request", shortRequest);

module.exports = router;
