const autoBind = require("auto-bind");
const CourseServices = require("./course.services");

class CourseController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = CourseServices
    }
    async addCourse() {
        try {

        } catch (error) {
            next(error)
        }
    }
}
module.exports = new CourseController()