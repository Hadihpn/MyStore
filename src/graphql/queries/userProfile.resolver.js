const { GraphQLList, GraphQLString } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const blogServices = require("../../modules/admin/blog/blog.services")
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard")
const productServices = require("../../modules/admin/product/product.services")
const courseServices = require("../../modules/admin/course/course.services")
const { AnyType } = require("../typeDefs/public.types")
const userService = require("../../modules/admin/user/user.service")
//get the blogs that was bookmarked by user
const BookmarkedBlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const blog = await blogServices.getBlogByQurey({ bookmarks: user._id })
        return blog;
    }
}
const BookmarkedCourseResolver = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        // const { req, res } = context
        // req.user = await AuthorizationInGraphQl(req, res)
        const blog = await courseServices.getBlogByQurey({ bookmarks: user._id })
        return blog;
    }
}
const BookmarkedProductResolver = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        // const { req, res } = context
        // req.user = await AuthorizationInGraphQl(req, res)
        const blog = await productServices.getBlogByQurey({ bookmarks: user._id })
        return blog;
    }
}
const getUserBasketResolver = {
    type:  AnyType,
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await AuthorizationInGraphQl(req, res)
        const userDetail = await userService.getUserBasketDetail(user._id)
        return userDetail;
    }
}
module.exports = {
    BookmarkedBlogResolver,
    BookmarkedCourseResolver,
    BookmarkedProductResolver,
    getUserBasketResolver
}