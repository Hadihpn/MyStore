const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    fields: {
        _id: { type: GraphQLString },
        phone: { type: GraphQLString },
        userName: { type: GraphQLString },
    }
})
const PublicCategoryType = new GraphQLObjectType({
    name: "PublicCategoryType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
    }
})
module.exports = { AuthorType ,PublicCategoryType}