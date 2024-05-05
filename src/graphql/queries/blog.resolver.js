const { GraphQLList } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const { BlogModel } = require("../../modules/admin/blog/blog.model")

const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async () => {
        return await BlogModel.find({}).populate('author')
    }
}

module.exports = {
    BlogResolver
}