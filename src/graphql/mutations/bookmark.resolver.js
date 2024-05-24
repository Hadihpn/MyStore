const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const blogServices = require("../../modules/admin/blog/blog.services");
const productServices = require("../../modules/admin/product/product.services");
const courseServices = require("../../modules/admin/course/course.services");

const BookmarkBlogResolver = {
    type: ResponseType,
    args: {
        blogId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { blogId } = args;
        const userId = user._id
        const responsMsg = await blogServices.bookmarkBlog( blogId, userId)
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}
const BookmarkProductResolver = {
    type: ResponseType,
    args: {
        productId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { productId } = args;
        const userId = user._id
        const responsMsg = await productServices.bookmarkProduct(productId, userId)
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}
const BookmarkCourseResolver = {
    type: ResponseType,
    args: {
        courseId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { courseId } = args;
        const userId = user._id
        const responsMsg = await courseServices.bookmarkCourse( courseId, userId )
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}

module.exports = {
    BookmarkBlogResolver,
    BookmarkCourseResolver,
    BookmarkProductResolver
}