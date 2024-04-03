const homeController = require("./home.controller");
const Authorization = require("../../../common/guard/authorization.guard");

const router = require("express").Router();

router.get("/", homeController.indexPage)

module.exports = {
    HomeRoutes: router
}