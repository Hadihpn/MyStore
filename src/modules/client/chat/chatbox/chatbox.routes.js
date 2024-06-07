const chatboxController = require("./chatbox.controller");

const router = require("express").Router();

 router.get("/",chatboxController.renderChatRoom)
module.exports = {
    ChatboxRoutes:router
}