const UserAuthController = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();

router.post("/login" , UserAuthController.login)
router.post("/checkOtp" , UserAuthController.checkOtp)

module.exports = {
    UserAuthRoutes: router
}