const redisClient = require("../../app/common/utils/init_redis")
const { HomeRoutes } = require("./api/index.routes");
const { DeveloperRoutes } = require("./developer/developer.routes");
const { UserAuthRoutes } = require("./user/auth.routes");
(async () => {
    redisClient.set("key", "value")
    const value = await redisClient.get("key")
    console.log("value");
})()
const router = require("express").Router();
router.use("/", HomeRoutes);
router.use("/user", UserAuthRoutes);
router.use("/developer", DeveloperRoutes);
module.exports = {
    AllRoutes: router
}