const courseController = require("./course.controller");
const { stringToArray } = require("../../../common/middleware/stringToArray");
const { uploadFile, uploadVideo } = require("../../../common/utils/multer");
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
router.get("/chapter/:id", courseController.getChapterById) // get a chpater by id
router.patch("/editChapter/:id", courseController.updateChapter) //edit chapter
router.patch("/deleteChapter/:id", courseController.deleteChapter) //delete chapter
//#endregion

//#region Episode Routes
router.post("/addEpisode",setFolderPath("course"), uploadVideo.single("video"),courseController.addEpisode) // add new episode
// router.get("/:chpaterId", courseController) // get list of Episode of chapter
// router.get("/:episodeId", courseController.) // get a Episode by id
 router.patch("/editEpisode/:id",courseController.updateEpisode) //edit chapter
 router.delete("/deleteEpisode/:id",courseController.deleteEpisode) //delete chapter
//#endregion


module.exports = {
    CourseRoutes: router
}