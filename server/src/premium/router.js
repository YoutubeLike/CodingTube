const express = require("express");
const router = express.Router();

const { premium } = require("./controller.js");

router.post("/create-checkout-session", premium);

module.exports = router;
