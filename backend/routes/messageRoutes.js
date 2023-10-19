const express = require("express");
const { protect } = require("../middleware/auth");
const { sendMessage, allMessages } = require("../controllers/messages.controller");

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route(":/chatid").get(protect, allMessages);

module.exports = router;