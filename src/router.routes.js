const redisClient = require("./common/utils/init_redis");
const { CategoryRoutes } = require("./modules/admin/category/category.routes");
const { HomeRoutes } = require("./modules/api/home/index.routes");
const { DeveloperRoutes } = require("./modules/admin/developer/developer.routes");
const { UserAuthRoutes } = require("./modules/client/authentication/auth.routes");
const {ClientRoutes} = require("./modules/client/client.routes");
const { AdminRoutes } = require("./modules/admin/admin.routes");
(async () => {
    redisClient.set("key", "value")
    const value = await redisClient.get("key")
})()
const router = require("express").Router();
router.use("/", HomeRoutes);
router.use("/client", ClientRoutes);
router.use("/admin", AdminRoutes);
module.exports = {
    AllRoutes: router
}