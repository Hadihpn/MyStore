const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const AuthorType = new GraphQLObjectType({
    name: "authorType",
    fields: {
        _id: { type: GraphQLString },
        phone: { type: GraphQLString },
        userName: { type: GraphQLString },
    }
})
const CategoryType = new GraphQLObjectType({
    name: "categoryType",
    fields: {
        title: { type: GraphQLString },
    }
})
module.exports = { AuthorType ,CategoryType}