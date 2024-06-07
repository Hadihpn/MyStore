const authController = require("./authentication/auth.controller");
const { UserAuthRoutes } = require("./authentication/auth.routes");
const { ChatRoutes } = require("./chat/chat.routes");

const router = require("express").Router();

router.use("/user", UserAuthRoutes)
router.use("/chat",ChatRoutes)
// router.use("/user", userController)
module.exports = {
    ClientRoutes: router
}