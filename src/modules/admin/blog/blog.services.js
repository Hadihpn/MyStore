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
        if (!findQuery || findQuery == "") return await this.#model.find()
            .populate([
                { path: "category" },
                { path: "author" },
                { path: "comments.user" },
                { path: "questions.user" },
                { path: "questions.answers.user" },
                { path: "likes" },
                { path: "dislikes" },
                { path: "bookmarks" },
            ]);
            const x = await this.#model.find(findQuery).populate([
            ])
            console.log(x[0].category[0]);
        return x;
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
        const blog = await this.#model.findOne({ "comments._id": commentId }, { "comments.$": 1 });
        const copiedBlog = copyObject(blog);
        if (!blog?.comments?.[0]) throw createHttpError.NotFound("cannot find any comment")
        return blog?.comments?.[0];

    }
    async getBlogQuestionById(questiontId) {
        const blog = await this.#model.findOne({ "questions._id": questiontId }, { "questions.$": 1 });
        const copiedBlog = copyObject(blog);
        if (!blog?.questions?.[0]) throw createHttpError.NotFound("cannot find any question")
        return blog?.questions?.[0];

    }
    async checkExistRepliedComment(commentId) {
        const blog = await this.#model.findOne({ "comments._id": commentId }, { "comments.$": 1 });
        if (blog) return true;
        return false;
    }
    async checkExistRepliedQuestion(questionId) {
        const blog = await this.#model.findOne({ "questions._id": questionId }, { "questions.$": 1 });
        if (blog) return true;
        return false;
    }
    async addBlogComment(blogId, comment) {

        return await this.#model.updateOne({ _id: blogId },
            {
                $push: {
                    comments: {
                        user: comment.user,
                        text: comment.text,
                        show: comment.show,
                        // openToComment: comment.openToComment,
                        replyTo: comment.replyTo
                    }

                }
            });
    }
    async addBlogQuestion(blogId, comment) {
        return await this.#model.updateOne({ _id: blogId },
            {
                $push: {
                    questions: {
                        user: comment.user,
                        text: comment.text,
                        show: comment.show,
                        // openToComment: comment.openToComment,
                        replyTo: comment.replyTo
                    }

                }
            });
    }
    async addBlogAnswer(answerTo, question) {
        return await this.#model.updateOne(
            {
                _id: answerTo,
                "question._id": answerTo
            },
            {
                $push: {
                    "questions.$.answers": {
                        user: question.user,
                        text: question.text,
                        show: question.show,
                        openToAnswer: question.openToAnswer,
                    }

                }
            });
    }
    async likeAndDisLikeBlog(blogId, userId) {
        const likedBlog = await this.getBlogByQurey({ _id: blogId, likes: userId })
        const disLikedBlog = await this.getBlogByQurey({ _id: blogId, disLikes: userId })
        let message = "";
        if (likedBlog && disLikedBlog) {
            await this.#model.updateOne({ _id: blogId },
                { $pull: { disLikes: userId } }
            )
            message = "you like this blog"
        }
        else {
            if (likedBlog) {
                await this.#model.updateOne({ _id: blogId },
                    {
                        $pull: { likes: userId },
                        $push: { disLikes: userId }
                    }

                )
                message = "you disLike this blog"
            } else {
                await this.#model.updateOne({ _id: blogId },
                    {
                        $pull: { disLikes: userId },
                        $push: { likes: userId }
                    }

                )
                message = "you Like this blog"
            }
            return message
        }
    }
    async bookmarkBlog(blogId, userId) {
        const bookmarkedBlog = await this.getBlogByQurey({ _id: blogId, bookmarks: userId })
        console.log(bookmarkedBlog);
        console.log(bookmarkedBlog[0]);
        let message = "";
        if (bookmarkedBlog[0]) {
            await this.#model.updateOne({ _id: blogId },
                { $pull: { bookmarks: userId } }
            )
            message = "the blog removed from bookmark"
        }
        else {
            await this.#model.updateOne({ _id: blogId },
                {
                    $push: { bookmarks: userId }
                }
            )
            message = "the blog added to bookmark"

        }
        return message
    }

}
module.exports = new BlogServices()