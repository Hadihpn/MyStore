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
    async getListOfBlogs(findQuery) {
        console.log(findQuery);
        const blogs = await this.#model.aggregate([
            {
                $match: {"category":'firstCategory'}
                // $match: (!findQuery || findQuery == "") ? {} : findQuery
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
                    "author.role": 0,
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
    async editBlog(id, data) {
        return await this.#model.updateOne({ _id: id }, { $set: data });
    }
    async getBlogById(_id) {
        return await this.#model.findById(_id).populate([{ path: "category_detail", select: { title: 1 } }, { path: "author_detail", select: { phone: 1 } }])
    }
    async getBlogByQurey(findQuery = {}) {
        if (!findQuery || findQuery == "" ) return await this.#model.find()
        return await this.#model.find(findQuery).populate([{ path: "category_detail" }, { path: "author_detail" }]);
    }
    async checkExist(_id) {
        return await this.#model.exists({_id:_id})
    }
    async deleteBlogById(_id) {
        const blog = await this.getBlogById(_id)
        await this.#model.deleteOne({ _id });
        return blog.image;
    }
    async addBlogComment(blogId, comment) {
        return await this.#model.updateOne({ _id: blogId },
             { $push: {
                comment,user
             } });
    }

}
module.exports = new BlogServices()