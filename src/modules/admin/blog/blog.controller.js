const autobind=require("auto-bind");
const blogServices = require("./blog.services");
class BlogController{
    #service
    constructor(){
        autobind(this);
        this.#service = blogServices;
    }
    async createBlog(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getBlogById(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getListOfBlogs(req,res,next){
        try {
            return res.status(200).json({
                blog:[]
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteBlog(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async updateBlog(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    
}
module.exports = new BlogController()