const Authorization = require("../../../common/guard/authorization.guard");
const PaymentController = require("./payment.controller");
const router = require("express").Router();

router.post("/payment",PaymentController.PaymentGateway)
router.post("/verify", )
module.exports = {
    PaymentRoutes: router
}