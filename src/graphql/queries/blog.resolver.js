const { GraphQLList, GraphQLString } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const blogServices = require("../../modules/admin/blog/blog.services")
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard")

const BlogResolver = {
    type: new GraphQLList(BlogType),
    args: {
        category: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        // req?.cookies?.accessToken = context.req.headers
        const {category} = args;
        const findQuery = category?{category}:"";
        // req.user = await AuthorizationInGraphQl(req, res)
        const x = await blogServices.getBlogByQurey(findQuery)
        return x;
    }
}

module.exports = {
    BlogResolver
}