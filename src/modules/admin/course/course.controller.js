const autoBind = require("auto-bind");
const CourseServices = require("./course.services");
const { ObjectIdSchema } = require("../../../common/validators/public.schema");
const { StatusCodes: httpstatus } = require("http-status-codes");
const { listOfImagesFormRequest, deleteFileInPublic, deleteInvalidPropertyInObject, removePathBackSlash, convertToNormalTime, getTimeOfCourse } = require("../../../common/utils/function");
const { addCourseSchema, addChapterSchema, addEpisodeSchema, editEpisodeSchema } = require("../../../common/validators/admin/course.schema");
const createHttpError = require("http-errors");
const { CourseMessage } = require("./course.messages");
const { default: getVideoDurationInSeconds } = require("get-video-duration")
const path = require("path");
const { log } = require("console");

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
            const course = await this.#service.getCourseById(id);
            // course.time = await getTimeOfCourse(course.chapters);
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: { course }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateCourse(req, res, next) {
        try {
            const { id } = await ObjectIdSchema.validateAsync(req.params);
            const course = await this.#service.getCourseById(id);
            const data = req.body;

            let blackListField = ["time", "chapters", "episodes", "students", "bookmarks", "likes", "dislikes", "comments"];
            deleteInvalidPropertyInObject(data, blackListField);
            const result = await this.#service.updateCourse(id, data);
            if (result.modifiedCount == 0) throw createHttpError.InternalServerError("بروزرسانی انجام نشد")
            if (req.files) {
                const uploadPath = req.body.fileUploadPath
                const image = listOfImagesFormRequest(req.files || [], uploadPath)
                deleteFileInPublic(course.image.split(","));
                // req.body.image = image;
            }
            // const courseDataBody = addCourseSchema.validateAsync(data)
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    data: "بروزرسانی با موفقیت انجام شد"
                }
            })
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
    async updateChapter(req, res, next) {
        const { id } = await ObjectIdSchema.validateAsync(req.params);
        const data = req.body;
        deleteInvalidPropertyInObject(data, ["_id"])
        const updateChapterResult = await this.#service.updateChapter({ id, data })
        if (updateChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError(CourseMessage.unSuccessulChapterChange);
        return res.status(httpstatus.OK).json({
            statusCode: httpstatus.OK,
            data: {
                message: CourseMessage.editChapter
            }
        });
    }
    async deleteChapter(req, res, next) {
        const { id } = await ObjectIdSchema.validateAsync(req.params);
        const removedChpaterResult = await this.#service.deleteChapter(id)
        if (removedChpaterResult.modifiedCount == 0) throw createHttpError.InternalServerError(CourseMessage.unSuccessulChapterChange);
        return res.status(httpstatus.OK).json({
            statusCode: httpstatus.OK,
            data: {
                message: CourseMessage.deleteChapter
            }
        });
    }
    //#endregion
    //#region Episode
    async addEpisode(req, res, next) {
        try {
            await addEpisodeSchema.validateAsync(req.body);
            const { courseId, chapterId, title, text, filename, fileUploadPath } = req.body;
            const address = path.join(fileUploadPath, filename)
            const videoAddress = removePathBackSlash(address.toString());
            // const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}:${__dirname}/${videoAddress}`
            const videoUrl = path.join(
                __dirname,
                "..",
                "..",
                "..",
                "..",
                "public/",
                videoAddress
            )
            req.body.videoAddress = videoUrl;
            // // const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`
            // // const videoUrl = `${directory}/${videoAddress}`
            const seconds = await getVideoDurationInSeconds(videoUrl)
            // // const time = convertToNormalTime(seconds)
            // // i prefer store time of video per second . it can be convert to commen format in frontEnd
            const time = seconds
            const saveEpisodeResult = await this.#service.addEpisode({ courseId, chapterId, title, text, time, videoAddress })
            if (saveEpisodeResult.modifiedCount == 0) throw createHttpError.InternalServerError("new Episode does not save")
            return res.status(httpstatus.CREATED).json({
                statusCode: httpstatus.CREATED,
                data: {
                    message: "new Episode added successfully",
                    data: { courseId, chapterId, title, text, filename, fileUploadPath },
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.videoAddress)
            next(error)
        }
    }
    // async getEpisodesOfCourse(req, res, next) {
    //     try {
    //         const { id } = await ObjectIdSchema.validateAsync(req.params);
    //         const Episodes = await this.#service.getEpisodesOfCourse(id);
    //         return res.status(httpstatus.OK).json({
    //             statusCode: httpstatus.OK,
    //             data: {
    //                 Episodes
    //             }
    //         })

    //     } catch (error) {
    //         next(error)
    //     }
    // }
    // async getEpisodesOfChapter(req, res, next) {
    //     try {
    //         const { id } = await ObjectIdSchema.validateAsync(req.params);
    //         const Episodes = await this.#service.getEpisodesOfCourse(id);
    //         return res.status(httpstatus.OK).json({
    //             statusCode: httpstatus.OK,
    //             data: {
    //                 Episodes
    //             }
    //         })

    //     } catch (error) {
    //         next(error)
    //     }
    // }
    // async getEpisodeById(req, res, next) {
    //     const { id } = await ObjectIdSchema.validateAsync(req.params);
    //     const Episode = await this.#service.getEpisodeById(id)
    //     return res.status(httpstatus.OK).json({
    //         statusCode: httpstatus.OK,
    //         data: {
    //             Episode
    //         }
    //     });
    // }
    async updateEpisode(req, res, next) {
        const { id } = await ObjectIdSchema.validateAsync(req.params);
        const data = await editEpisodeSchema.validateAsync(req.body)
        deleteInvalidPropertyInObject(data, ["_id"])
        const updateEpisodeResult = await this.#service.updateEpisode({ id, data })
        console.log(updateEpisodeResult);
        if (updateEpisodeResult.modifiedCount == 0) throw createHttpError.InternalServerError(CourseMessage.unSuccessulEpisodeChange);
        return res.status(httpstatus.OK).json({
            statusCode: httpstatus.OK,
            data: {
                message: CourseMessage.deleteEpisode
            }
        });
    }

    async deleteEpisode(req, res, next) {
        const { id } = await ObjectIdSchema.validateAsync(req.params);
        const { result, address } = await this.#service.deleteEpisode(id)
        if (result.modifiedCount == 0) throw createHttpError.InternalServerError(CourseMessage.unSuccessulEpisodeChange);
        console.log(address.split(","));
        deleteFileInPublic(address.split(","))
        return res.status(httpstatus.OK).json({
            statusCode: httpstatus.OK,
            data: {
                message: CourseMessage.deleteEpisode
            }
        });
    }

    //#endregion
}
module.exports = new CourseController()