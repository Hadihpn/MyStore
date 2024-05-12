const { GtaphQlObjectType, GraphQLObjectType, GraphQLSchema } = require("graphql")
const { BlogResolver } = require("./queries/blog.resolver")
const { ProductResolver } = require("./queries/product.resolver")
const { CategoryResolver, CategoryChildResolver } = require("./queries/category.resolver")
const { CourseResolver } = require("./queries/course.resolver")
const { CommentForBlogResolver } = require("./queries/comment.resolver")
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        category: CategoryResolver,
        childOfCategory: CategoryChildResolver,
        course: CourseResolver,
       
    }
})

//GUD
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        BlogComment:CommentForBlogResolver
    }
})
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

module.exports = {
    graphQLSchema
}