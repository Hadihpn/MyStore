const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const blogServices = require("../../modules/admin/blog/blog.services");
const productServices = require("../../modules/admin/product/product.services");
const courseServices = require("../../modules/admin/course/course.services");

const LikeAndDislikeBlog = {
    type: ResponseType,
    args: {
        blogId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { blogId } = args;
        const responsMsg = await blogServices.likeAndDisLikeBlog({ _id: blogId, likes: user._id })
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
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
        const responsMsg = await productServices.likeAndDisLikProduct({ _id: productId, likes: user._id })
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
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
        const responsMsg = await courseServices.likeAndDisLikCourse({ _id: courseId, likes: user._id })
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}
