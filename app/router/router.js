const { HomeRoutes } = require("./api");

const router = require("express").Router();
router.post("/",HomeRoutes);
module.exports = {
    AllRoutes: router
}