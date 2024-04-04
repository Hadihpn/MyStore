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
            }, {
                $unwind: "$author"
            },
            {
                $project: {
                    "author.accessToken": 0,
                    "author.__v": 0,
                    "author.verifiedMobile": 0,
                    "author.roles": 0,
                    "author.otp": 0,
                }
            },
            {
                $lookup: {
                    from: "categories",
                    foreignField: "_id",
                    localField: "category",
                    as: "category"
                }
            }, {
                $unwind: "$category"
            },
        ])
        return blogs
    }
    async editBlog(id,data){
        return await this.#model.updateOne({_id:id},{$set:data});
    }
    async getBlogById(_id) {
        return await this.#model.findById(_id).populate([{ path: "category_detail", select: { title: 1 } }, { path: "author_detail" , select: { phone: 1 }}])
    }
    async getBlogByQurey(query = {}) {
        return await this.#model.find(query).populate([{ path: "category_detail" }, { path: "author_detail" }]);
    }
    async deleteBlogById(_id) {
        const blog = await this.getBlogById(_id)
        await this.#model.deleteOne({ _id });
        return blog.image;
    }

}
module.exports = new BlogServices()