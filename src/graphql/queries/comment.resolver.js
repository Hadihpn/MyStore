const { GraphQLList, GraphQLString } = require("graphql");
const { CommentType } = require("../typeDefs/comment.type");
const blogServices = require("../../modules/admin/blog/blog.services");
const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.types");
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard");
const { text } = require("express");
const { default: mongoose } = require("mongoose");

const CommentForBlogResolver = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        blogId: { type: GraphQLString },
        replyTo: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        // if (!(user.openToComment)) { throw new createHttpError.BadRequest("you have been prevented to add comment. u had been blocke as our rules") }
        const { comment, blogId, replyTo } = args;
        const existedBlog = await blogServices.checkExist(blogId);
        if (!existedBlog) throw createHttpError.NotFound("no blog founded  with this id")
        if (replyTo && mongoose.isValidObjectId(replyTo)) {
            const repliedComment = await blogServices.checkExistRepliedComment(replyTo)
            if (!(repliedComment)) { throw new createHttpError.BadRequest("it seems you reply to nothing!!!") }
        }


        // const newComment = { user: user._id, text: comment, show: false, openToComment: (!answer), answer: answer }
        const newComment = { user: user._id, text: comment, show: false, replyTo: replyTo }
        await blogServices.addBlogComment(blogId, newComment)
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: "comment added successfuly and needed to confirm by Admin"
            }
        }
        // return await ProductModel.find({}).populate([{path:"supplier"}])
    }
}
module.exports = {
    CommentForBlogResolver
}