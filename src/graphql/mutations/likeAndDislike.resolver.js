const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const blogServices = require("../../modules/admin/blog/blog.services");

const LikeAndDislikeBlog = {
    type: ResponseType,
    args: {
        blogId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { blogId } = args;
        let message = ""
        const likedProduct = await blogServices.getBlogByQurey({_id:blogId,likes:user._id})
        const likedProduct = await blogServices.getBlogByQurey({_id:blogId,dislikes:user._id})

        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: ""
            }
        }
    }
}
const LikeAndDislikeProduct = {
    type: ResponseType,
    args: {
        productId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { productId } = args;
    }
}
const LikeAndDislikeCourse = {
    type: ResponseType,
    args: {
        courseId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { courseId } = args;
    }
}
module.exports = {
    LikeBlog,
    LikeProduct,
    LikeCourse
}