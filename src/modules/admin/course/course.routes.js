const courseController = require("./course.controller");
const { stringToArray } = require("../../../common/middleware/stringToArray");
const { uploadFile } = require("../../../common/utils/multer");
const { setFolderPath } = require("../../../common/middleware/setMulterUploadpath");
const router = require("express").Router();

//#region Course Routes
router.post("/addCourse", setFolderPath("course"), uploadFile.single("image"), stringToArray("tags"), courseController.addCourse)
router.get("/", courseController.getListOfCourse) //get list of courses
router.get("/:id", courseController.getCourseById) // get course by id
//router.get("/:id",courseController.) // get students of course
// router.patch("/:id",courseController.) // edit course
// router.delete("/:id",courseController.) // delete course
//#endregion
//#region Chapter Routes
router.put("/addChapter", courseController.addChapter) // add new chapter
router.get("/chaptersOfCourse/:id", courseController.getChapterOfCourse) // get list of chapter of course ,id=courseId
// router.get("/:chpaterId", courseController.) // get a chpater by id
// router.patch("/:id",courseController.) //edit chapter
// router.delete("/:id",courseController.) //delete chapter
//#endregion

//#region Episode Routes
// router.put("/addEpisode",courseController) // add new chapter
// router.get("/:chpaterId", courseController) // get list of Episode of chapter
// router.get("/:episodeId", courseController.) // get a Episode by id
// router.patch("/:id",courseController.) //edit chapter
// router.delete("/:id",courseController.) //delete chapter
//#endregion


module.exports = {
    CourseRoutes: router
}