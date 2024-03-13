const { HomeRoutes } = require("./api/index.routes");
const { UserAuthRoutes } = require("./user/auth.routes");

const router = require("express").Router();
router.use("/",HomeRoutes);
 router.use("/user",UserAuthRoutes);
module.exports = {
    AllRoutes: router
}