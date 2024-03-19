const homeController = require("../../http/controllers/api/home.controller");
const Authorization = require("../../http/middlewares/guard/authorization.guard");

const router = require("express").Router();

router.get("/",Authorization, homeController.indexPage)

module.exports = {
    HomeRoutes: router
}