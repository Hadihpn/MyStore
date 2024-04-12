const autoBind = require("auto-bind");
const CourseServices = require("./course.services");
const { ObjectIdSchema } = require("../../../common/validators/public.schema");
const { StatusCodes: httpstatus } = require("http-status-codes")
class CourseController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = CourseServices
    }
    async addCourse(req, res, next) {
        try {
            // const courseBody ;
        } catch (error) {
            next(error)
        }
    }
    async getListOfCourse(req, res, next) {
        try {
            const { search } = req?.query?.search || [];
            const courseList = await this.#service.findCourse(search)
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: courseList
            })
        } catch (error) {
            next(error)
        }
    }
    async getCourseById(req, res, next) {
        try {
            const { id } = await ObjectIdSchema.validateAsync(req.params);
            const course = await this.#service.findCourseById(id);
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: courseList
            })
        } catch (error) {
            next(error)
        }
    }
    async editCourse(req, res, next) {
        try {
            const { id } = await ObjectIdSchema.validateAsync(req.params);
        } catch (error) {
            next(error)
        }
    }
    async deleteCourse(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}
module.exports = new CourseController()