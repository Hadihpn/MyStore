const { setFolderPath } = require("../../../common/middleware/setMulterUploadpath");
const { stringToArray } = require("../../../common/middleware/stringToArray");
const { uploadFile } = require("../../../common/utils/multer");
const BlogController = require("./blog.controller");

const router = require("express").Router();
// router.post("/createBlog", setFolderPath("blog"), uploadFile.single("image"), stringToArray("tags"), BlogController.createBlog)
router.post("/createBlog", setFolderPath("blog"), uploadFile.single("image"), stringToArray("tags"), BlogController.createBlog)
router.patch("/edit/:id", setFolderPath("blog"), uploadFile.single("image"), stringToArray("tags"), BlogController.editBlog)
router.get("/", BlogController.getListOfBlogs)
router.get("/:id", BlogController.getBlogById)
router.get("/:id", BlogController.getBlogByQurey)
router.delete("/delete/:id", BlogController.deleteBlog)
module.exports = {
    BlogRoutes: router
} 