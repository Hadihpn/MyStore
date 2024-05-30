const { ROLES } = require("../../common/constant/constantVar");
const {Authorization, checkRole, checkPermission} = require("../../common/guard/authorization.guard");
const { PaymentRoutes } = require("./payment/payment.routes");


const router = require("express").Router();

 router.use("/payment",Authorization, PaymentRoutes)
module.exports = {
    ApiRoutes: router
}