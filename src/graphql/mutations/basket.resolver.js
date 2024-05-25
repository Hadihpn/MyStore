const { GraphQLString, GraphQLInt } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const blogServices = require("../../modules/admin/blog/blog.services");
const productServices = require("../../modules/admin/product/product.services");
const courseServices = require("../../modules/admin/course/course.services");

const AddProductToBasket = {
    type: ResponseType,
    args: {
        productId: { type: GraphQLString },
        count: { type: GraphQLInt }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { productId, count } = args;
        const userId = user._id
        await productServices.checkExist(productId)
        const responsMsg = await blogServices.bookmarkBlog(blogId, userId)
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}
const AddCourseToBasket = {
    type: ResponseType,
    args: {
        courseID: { type: GraphQLString },
        count: { type: GraphQLInt }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { courseId, count } = args;
        const userId = user._id
        await courseServices.checkExist(courseId)
        const responsMsg = await productServices.bookmarkProduct(productId, userId)
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}
const RemoveProductToBasket = {
    type: ResponseType,
    args: {
        productId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { productId } = args;
        const userId = user._id
        await productServices.checkExist(productId)
        const responsMsg = await blogServices.bookmarkBlog(blogId, userId)
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}
const RemoveCourseToBasket = {
    type: ResponseType,
    args: {
        courseID: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { courseId } = args;
        const userId = user._id
        await courseServices.checkExist(courseId)
        const responsMsg = await productServices.bookmarkProduct(productId, userId)
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}



module.exports = {
    AddProductToBasket,
    AddCourseToBasket,
    RemoveProductToBasket,
    RemoveCourseToBasket,

}