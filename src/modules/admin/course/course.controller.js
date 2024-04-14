const autoBind = require("auto-bind");
const CourseServices = require("./course.services");
const { ObjectIdSchema } = require("../../../common/validators/public.schema");
const { StatusCodes: httpstatus } = require("http-status-codes");
const { listOfImagesFormRequest, deleteFileInPublic } = require("../../../common/utils/function");
const { addCourseSchema, addChapterSchema } = require("../../../common/validators/admin/course.schema");
const createHttpError = require("http-errors");
const { CourseMessage } = require("./course.messages");
class CourseController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = CourseServices
    }
    //#region Course
    async addCourse(req, res, next) {
        const uploadPath = req.body.fileUploadPath
        const image = listOfImagesFormRequest(req?.file || [], uploadPath);
        try {
            const courseDataBody = await addCourseSchema.validateAsync(req.body)
            req.body.image = image
            const { title, text, short_text, category, price, count, dicsount, type, format, teacher } = req.body;
            if (type == "free" && Number(price) > 0) throw createHttpError.BadRequest(CourseMessage.FreeCourse)
            await this.#service.createCourse({ title, text, short_text, category, price, count, dicsount, type, format, teacher, image })
            return res.status(httpstatus.CREATED).json({
                data: { courseDataBody },
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
                data: { courseList }
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
                data: { course }
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
    //#endregion

    //#region Chapter
    async addChapter(req, res, next) {
        try {
            await addChapterSchema.validateAsync(req.body);
            const { id, title, text } = req.body;
            console.log({ id, title, text });
            const saveChapterResult = await this.#service.addChapter({ id, title, text })
            if (saveChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("new chapter does not save")
            return res.status(httpstatus.CREATED).json({
                statusCode: httpstatus.CREATED,
                data: {
                    message: "new chapter added successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getChapterOfCourse(req, res, next) {
        try {
            const { id } = await ObjectIdSchema.validateAsync(req.params);
            const chapters = await this.#service.getChaptersOfCourse(id);
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    chapters
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async getChapterById(req, res, next) {
        const { id } = await ObjectIdSchema.validateAsync(req.params);
        const chapter = await this.#service.getChapterById(id)
        return res.status(httpstatus.OK).json({
            statusCode: httpstatus.OK,
            data: {
                chapter
            }
        });
    }
    async deleteChapter(req, res, next) {
        const { id } = await ObjectIdSchema.validateAsync(req.params);
        const removedChpaterResult = await this.#service.deleteChapter(id)
        if(removedChpaterResult.modifiedCount==0) throw createHttpError.InternalServerError(CourseMessage.unSuccessulChpaterDelete);
        return res.status(httpstatus.OK).json({
            statusCode: httpstatus.OK,
            data: {
                message: CourseMessage.deleteChapter
            }
        });
    }
    //#endregion
    //#region Episode
    //#endregion
}
module.exports = new CourseController()