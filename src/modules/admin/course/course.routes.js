const courseController = require("./course.controller");
const { stringToArray } = require("../../../common/middleware/stringToArray");
const { uploadFile } = require("../../../common/utils/multer");
const { setFolderPath } = require("../../../common/middleware/setMulterUploadpath");
const router = require("express").Router();

//#Course Routes
router.post("/addCourse", setFolderPath("course"), uploadFile.array("images", 10), stringToArray("tags"), courseController.addCourse)
router.get("/", courseController.getListOfCourse) //get list of courses
router.get("/:id", courseController.getCourseById) // get course by id
//router.get("/:id",courseController.) // get students of course
// router.patch("/:id",courseController.) // edit course
// router.delete("/:id",courseController.) // delete course


//#Chapter Routes
// router.put("/addChapter",courseController) // add new chapter
// router.get("/:courseId", courseController) // get list of chapter of course
// router.get("/:chpaterId", courseController.) // get a chpater by id
// router.patch("/:id",courseController.) //edit chapter
// router.delete("/:id",courseController.) //delete chapter

//#Episode Routes
// router.put("/addEpisode",courseController) // add new chapter
// router.get("/:chpaterId", courseController) // get list of Episode of chapter
// router.get("/:episodeId", courseController.) // get a Episode by id
// router.patch("/:id",courseController.) //edit chapter
// router.delete("/:id",courseController.) //delete chapter


module.exports = {
    CourseRoutes: router
}