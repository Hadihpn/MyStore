const { GraphQLList } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const { BlogModel } = require("../../modules/admin/blog/blog.model")
const blogServices = require("../../modules/admin/blog/blog.services")
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard")

const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async (_,args,context) => {
        // req?.cookies?.accessToken = context.req.headers
        console.log(context.req.headers.authorization);
        const {req,res} = context
        AuthorizationInGraphQl(req,res)
        // return await BlogModel.find({}).populate('author')
        return await blogServices.getListOfBlogs()
    }
}

module.exports = {
    BlogResolver
}