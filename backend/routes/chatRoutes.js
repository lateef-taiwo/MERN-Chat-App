const chatRoutes = require("express").Router();
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controllers/chats.controller");
const { protect } = require("../middleware/auth");


chatRoutes.route("/").post(protect, accessChat);
chatRoutes.route("/").get(protect, fetchChats);
chatRoutes.route("/group").post(protect, createGroupChat);
chatRoutes.route("/rename").put(protect, renameGroup);
chatRoutes.route("/groupadd").put(protect, addToGroup);
chatRoutes.route("/groupremove").put(protect, removeFromGroup);

module.exports = chatRoutes;
