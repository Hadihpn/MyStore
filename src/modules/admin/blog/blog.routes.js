const { stringToArray } = require("../../../common/middleware/stringToArray");
const {  uploadFile } = require("../../../common/utils/multer");
const blogController = require("./blog.controller");

const router = require("express").Router();
router.post("/createBlog",uploadFile.single("image"),stringToArray("tags"),blogController.createBlog)
router.get("/",blogController.getListOfBlogs)
module.exports ={
    BlogRoutes:router
}