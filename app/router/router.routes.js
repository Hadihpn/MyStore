const redisClient = require("../../app/common/utils/init_redis")
const { HomeRoutes } = require("./api/index.routes");
const { UserAuthRoutes } = require("./user/auth.routes");
(async () => {
    redisClient.set("key", "value")
    const value = await redisClient.get("key")
    console.log("value");
})()
const router = require("express").Router();
router.use("/", HomeRoutes);
router.use("/user", UserAuthRoutes);
module.exports = {
    AllRoutes: router
}