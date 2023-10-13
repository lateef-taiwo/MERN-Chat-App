const chatRoutes = require("express").Router();
const { accessChat } = require("../controllers/chat.controller");

// chatRoutes.route("/").get(allChats);
chatRoutes.route("/").post(accessChat);
// chatRoutes.route("/group").post(createGroupChat);
// chatRoutes.route("/rename").put(renameGroup);
// chatRoutes.route("/groupremove").put(removeFromGroup);
// chatRoutes.route("/groupadd").put(addToGroup);

module.exports = chatRoutes;
