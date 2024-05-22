const { GraphQLList, GraphQLString } = require("graphql");
const { QuestionType } = require("../typeDefs/comment.type");
const blogServices = require("../../modules/admin/blog/blog.services");
const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.types");
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard");
const { text } = require("express");
const { default: mongoose } = require("mongoose");

const QuestionForBlogResolver = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        blogId: { type: GraphQLString },
        replyTo: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        // if (!(user.openToAnswer)) { throw new createHttpError.BadRequest("you have been prevented to add comment. u had been blocke as our rules") }
        const { text, blogId, answerTo } = args;
        const existedBlog = await blogServices.checkExist(blogId);
        if (!existedBlog) throw createHttpError.NotFound("no blog founded  with this id")
        const newQuestion = { user: user._id, text: text, show: false, answerTo: answerTo, openToAnswer: true }
        if (answerTo && mongoose.isValidObjectId(answerTo)) {
            const answer = await blogServices.getBlogQuestionById(answerTo)
            if (!(answer.openToAnswer)) { throw new createHttpError.BadRequest("it seems you answer to nothing!!!") }
            newQuestion.openToAnswer = false
            await blogServices.addBlogAnswer(answerTo, newQuestion)
            return {
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "the answer added successfully"
                }
            }
        }
        else {
            await blogServices.addBlogQuestion(blogId, newQuestion)
            return {
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "comment added successfuly and needed to confirm by Admin"
                }
            }
        }
        // const newQuestion = { user: user._id, text: comment, show: false, openToQuestion: (!answer), answer: answer }



        // return await ProductModel.find({}).populate([{path:"supplier"}])
    }
}
module.exports = {
    QuestionForBlogResolver
}