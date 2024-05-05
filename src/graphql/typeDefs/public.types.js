const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const AuthorType = new GraphQLObjectType({
    name: "authorType",
    fields: {
        _id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
    }
})

module.exports = { AuthorType }