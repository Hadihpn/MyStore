const autoBind = require("auto-bind");
const { BlogModel } = require("./blog.model");
const { CommentSchema } = require("../comment/comment.model");
const createHttpError = require("http-errors");
const { copyObject } = require("../../../common/utils/function");

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
                $match: { "category": 'firstCategory' }
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
        if (!findQuery || findQuery == "") return await this.#model.find().populate([{ path: "category" }, { path: "author" },{ path: "comments" }]);
        return await this.#model.find(findQuery).populate([{ path: "category" }, { path: "author" }]);
    }
    async checkExist(_id) {
        return await this.#model.exists({ _id: _id })
    }
    async deleteBlogById(_id) {
        const blog = await this.getBlogById(_id)
        await this.#model.deleteOne({ _id });
        return blog.image;
    }
    async getBlogCommentById(commentId) {
        const comment = await this.#model.findOne({ "comments._id": commentId }, { "comments.$": 1 });
        const copied = copyObject(comment);
        if (!comment?.comments?.[0]) throw createHttpError.NotFound("cannot find any comment")
        return comment?.comments?.[0];

    }
    async addBlogComment(blogId, comment) {
        return await this.#model.updateOne({ _id: blogId },
            {
                $push: {
                    comments: {
                        user: comment.user,
                        text: comment.text,
                        show: comment.show,
                        openToComment: comment.openToComment,
                        parent: comment.parent
                    }
                    // comments: {
                    //     text:comment.text,
                    //     user:comment.user,
                    //     show:comment.show,
                    //     openToComment:comment.openToComment,
                    //     parent:comment.parent
                    // }
                }
            });
    }

}
module.exports = new BlogServices()