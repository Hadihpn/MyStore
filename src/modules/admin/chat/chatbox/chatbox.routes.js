const chatController = require("./chatbox/chat.controller");

const router = require("express").Router();

router.get("/chat",chatController.renderChatRoom)
module.exports = {
    ChatboxRoutes:router
}