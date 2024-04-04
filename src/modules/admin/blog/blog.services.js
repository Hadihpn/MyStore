const autoBind = require("auto-bind");
const { BlogModel } = require("./blog.model");

class BlogServices {
    #model
    constructor() {
        autoBind(this);
        this.#model = BlogModel;
    }
    async createBlog(blogDto) {
        await this.#model.create(blogDto)
    }
    async getListOfBlogs() {
        const blogs = await this.#model.aggregate([
            {
                $match: {}
            },
            {
                $lookup: {
                    from: "users",
                    foreignField: "_id",
                    localField: "author",
                    as: "author"
                }
            },{
                $unwind:"$author"
            },
            {$project:{
                "author.accessToken":0,
                "author.__v":0,
                "author.verifiedMobile":0,
                "author.roles":0,
                "author.otp":0,
            }},
            {
                $lookup: {
                    from: "categories",
                    foreignField: "_id",
                    localField: "category",
                    as: "category"
                }
            },{
                $unwind:"$category"
            },
        ])
        return blogs
    }
    async getBlogById(_id){
        return await this.#model.findById(_id);
    }
    

}
module.exports = new BlogServices()