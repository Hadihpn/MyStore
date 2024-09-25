const { checklogin, checkAccesslogin } = require("../../../../common/middleware/auth");
const chatboxController = require("./chatbox.controller");

const router = require("express").Router();

router.get("/", checklogin, chatboxController.renderChatRoom);
router.get("/loginForm", checkAccesslogin, chatboxController.renderLoginForm);
router.post("/login", checkAccesslogin, chatboxController.Login);
module.exports = {
  ChatboxRoutes: router,
};
