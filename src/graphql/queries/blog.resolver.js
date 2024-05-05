const { GraphQLList } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const { BlogModel } = require("../../modules/admin/blog/blog.model")
const blogServices = require("../../modules/admin/blog/blog.services")

const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async () => {
        // return await BlogModel.find({}).populate('author')
        return await blogServices.getListOfBlogs()
    }
}

module.exports = {
    BlogResolver
}