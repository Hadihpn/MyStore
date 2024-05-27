const { GraphQLString, GraphQLInt } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const blogServices = require("../../modules/admin/blog/blog.services");
const productServices = require("../../modules/admin/product/product.services");
const courseServices = require("../../modules/admin/course/course.services");
const userService = require("../../modules/admin/user/user.service");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");

const AddProductToBasket = {
    type: ResponseType,
    args: {
        productId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { productId } = args;
        const userId = user._id
        if (!(isValidObjectId(userId) || isValidObjectId(productId))) throw new createHttpError.BadRequest("userId or productId is not valid")
        const productStatus = await productServices.checkExist(productId)
        if (!productStatus) throw createHttpError.BadRequest()
        const responsMsg = await userService.addProductToBasket(userId, productId)
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
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { courseId } = args;
        const userId = user._id
        if (!(isValidObjectId(userId) || isValidObjectId(courseId))) throw new createHttpError.BadRequest("userId or productId is not valid")
        const courseStatus = await productServices.checkExist(productId)
        if (!courseStatus) throw createHttpError.BadRequest()
        const responsMsg = await userService.addCourseToBasket(userId, courseId)
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}
const RemoveProductFromBasket = {
    type: ResponseType,
    args: {
        productId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { productId } = args;
        const userId = user._id
        const productStatus = await productServices.checkExist(productId)
        if (!productStatus) throw createHttpError.BadRequest("there is not any product with this id")
        const responsMsg = await userService.removeProductFromBasket(userId, productId)
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: responsMsg
            }
        }
    }
}
const RemoveCourseFromBasket = {
    type: ResponseType,
    args: {
        courseID: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const { courseId } = args;
        const userId = user._id
        const courseStatus = await productServices.checkExist(productId)
        if (!courseStatus) throw createHttpError.BadRequest()
        const responsMsg = await userService.removeCourseFromBasket(productId, userId)
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
    RemoveProductFromBasket,
    RemoveCourseFromBasket,

}