const courseController = require("./course.controller");

const router = require("express").Router();

router.post("/addCourse", courseController.addCourse)
module.exports = {
    CourseRoutes: router
}