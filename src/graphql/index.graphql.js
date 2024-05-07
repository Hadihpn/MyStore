const { GtaphQlObjectType, GraphQLObjectType, GraphQLSchema } = require("graphql")
const { BlogResolver } = require("./queries/blog.resolver")
const { ProductResolver } = require("./queries/product.resolver")
const { CategoryResolver, CategoryChildResolver } = require("./queries/category.resolver")
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        category: CategoryResolver,
        childOfCategory: CategoryChildResolver
    }
})
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {

    }
})
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation
})

module.exports = {
    graphQLSchema
}