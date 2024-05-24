const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const blogServices = require("../../modules/admin/blog/blog.services");
const productServices = require("../../modules/admin/product/product.services");
const courseServices = require("../../modules/admin/course/course.services");

const LikeAndDislikeBlogResolver = {
    type: ResponseType,
    args: {
        blogId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { blogId } = args;
        const userId = user._id
        const responsMsg = await blogServices.likeAndDisLikeBlog(blogId, userId)
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}
const LikeAndDislikeProductResolver = {
    type: ResponseType,
    args: {
        productId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { productId } = args;
        const userId = user._id
        const responsMsg = await productServices.likeAndDisLikProduct(productId, userId)
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}
const LikeAndDislikeCourseResolver = {
    type: ResponseType,
    args: {
        courseId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { courseId } = args;
        const responsMsg = await courseServices.likeAndDisLikCourse({ _id: courseId, likes: user._id })
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}

module.exports = {
    LikeAndDislikeBlogResolver,
    LikeAndDislikeProductResolver,
    LikeAndDislikeCourseResolver
}