const { GraphQLList, GraphQLString } = require("graphql");
const { CommentType } = require("../typeDefs/comment.type");
const blogServices = require("../../modules/admin/blog/blog.services");
const createHttpError = require("http-errors");
const { StatusCodes:HttpStatus } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.types");
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard");
const { text } = require("express");

const CommentForBlogResolver = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        blogId: { type: GraphQLString },
        parent: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        console.log(user._id);
        const { comment, blogId, parent } = args;
        const existedBlog = await blogServices.checkExist(blogId);
        if (!existedBlog) throw createHttpError.NotFound("no blog founded  with this id")
            console.log(!parent);
        const newComment ={user:user._id,text:comment,show:false,openToComment:(!parent),parent:parent}
        console.log(newComment);
        await blogServices.addBlogComment(blogId,  newComment)
        return { 
            statusCode:HttpStatus.CREATED,
            data:{
                message:"comment added successfuly and needed to confirm by Admin"
            }
        }
        // return await ProductModel.find({}).populate([{path:"supplier"}])
    }
}
module.exports = {
    CommentForBlogResolver
}