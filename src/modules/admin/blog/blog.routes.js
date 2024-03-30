const blogController = require("./blog.controller");

const router = require("express").Router();
router.post("/createBlog",blogController.createBlog)
router.get("/",blogController.getListOfBlogs)
module.exports ={
    BlogRoutes:router
}