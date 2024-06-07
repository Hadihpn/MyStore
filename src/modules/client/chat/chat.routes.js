const chatController = require("./chat.controller");

const router = require("express").Router();

router.get("/chat",chatController.renderChatRoom)

module.exports = {
    ChatRoutes:router
}