const autoBind = require("auto-bind");
const CourseServices = require("./course.services");
const { ObjectIdSchema } = require("../../../common/validators/public.schema");
const { StatusCodes: httpstatus } = require("http-status-codes");
const { listOfImagesFormRequest, deleteFileInPublic } = require("../../../common/utils/function");
const { addCourseSchema } = require("../../../common/validators/admin/course.schema");
const createHttpError = require("http-errors");
const { CourseMessage } = require("./course.messages");
class CourseController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = CourseServices
    }
    async addCourse(req, res, next) {
        const uploadPath = req.body.fileUploadPath
        const image = listOfImagesFormRequest(req?.file || [], uploadPath);
        try {
            const courseDataBody = await addCourseSchema.validateAsync(req.body)
            req.body.image = image
            const { title, text, short_text, category, price, count, dicsount, type, format, teacher } = req.body;
            if(type=="free" && Number(price)>0) throw createHttpError.BadRequest(CourseMessage.FreeCourse)
            await this.#service.createCourse({ title, text, short_text, category, price, count, dicsount, type, format, teacher, image })
            return res.status(httpstatus.CREATED).json({
                data: "courseDataBody",
                image: image
            })
        } catch (error) {
            deleteFileInPublic(image.split(","))
            next(error)
        }
    }
    async getListOfCourse(req, res, next) {
        try {
            const search = req?.query?.search || "";
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
                data: course
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