const chatboxController = require("./chatbox.controller");

const router = require("express").Router();

 router.get("/",chatboxController.renderChatRoom)
 router.get("/loginForm",chatboxController.renderLoginForm)
 router.post("/login",chatboxController.Login)
module.exports = {
    ChatboxRoutes:router
}