const messageRoutes = require("express").Router();
const { protect } = require("../middleware/auth");
const { sendMessage, allMessages} = require("../controllers/messages.controller");



messageRoutes.route("/").post(protect, sendMessage);
messageRoutes.route("/:chatId").get(protect, allMessages);

module.exports = messageRoutes;