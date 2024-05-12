const { GraphQLList, GraphQLString } = require("graphql");
const { CommentType } = require("../typeDefs/comment.type");
const blogServices = require("../../modules/admin/blog/blog.services");
const createHttpError = require("http-errors");
const { StatusCodes:HttpStatus } = require("http-status-codes");

const CommentForBlogResolver = {
    type: new GraphQLList(CommentType),
    args: {
        comment: { type: GraphQLString },
        blogId: { type: GraphQLString },
        parent: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { comment, blogId, parent } = args;
        const existedBlog = await blogServices.checkExist(blogId);
        if (!existedBlog) throw createHttpError.NotFound("no blog founded  with this id")
        comment.show = false;
        comment.openToComment = !parent
        console.log(comment, blogId, parent);
        await blogServices.addBlogComment(blogId, { comment, user: user._id })
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