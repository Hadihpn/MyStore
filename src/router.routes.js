const redisClient = require("./common/utils/init_redis");
const { CategoryRoutes } = require("./modules/admin/category/category.routes");
const { HomeRoutes } = require("./modules/api/home/index.routes");
const { DeveloperRoutes } = require("./modules/admin/developer/developer.routes");
const { UserAuthRoutes } = require("./modules/client/authentication/auth.routes");
const { ClientRoutes } = require("./modules/client/client.routes");
const { AdminRoutes } = require("./modules/admin/admin.routes");
const { graphqlHTTP } = require('express-graphql');
const { graphqlConfig } = require("./config/graphql.config");
const { ApiRoutes } = require("./modules/api/api.routes");
const clientRoutes = require("./modules/client/client.routes");
(async () => {
    redisClient.set("key", "value")
    const value = await redisClient.get("key")
})()
const router = require("express").Router();
router.use("/", HomeRoutes);
router.use("/client", ClientRoutes);
router.use("/admin", AdminRoutes);
router.use("/api", ApiRoutes);
router.use("/graphql", graphqlHTTP(graphqlConfig));
router.use("/support",ClientRoutes)
module.exports = {
    AllRoutes: router
}