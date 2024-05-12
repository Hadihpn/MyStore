const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLScalarType, Kind } = require("graphql");
const { parseObject, parseValueNode, parseLiterals, toObject } = require("../utils");

const AnyType = new GraphQLScalarType({
    name: "anyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiterals

})
const UserType = new GraphQLObjectType({
    name: "UserType",
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
const ResponseType = new GraphQLObjectType({
    name: "responseType",
    fields: {
        statusCode: { type: GraphQLString },
        data: { type: AnyType },
        

    }
})
module.exports = { UserType, PublicCategoryType ,AnyType,ResponseType}