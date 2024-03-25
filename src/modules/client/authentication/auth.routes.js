const UserAuthController = require("./auth.controller");

const router = require("express").Router();

router.post("/login" , UserAuthController.login)
router.post("/checkOtp" , UserAuthController.checkOtp)
router.post("/refreshToken" , UserAuthController.refreshToken)

module.exports = {
    UserAuthRoutes: router
}