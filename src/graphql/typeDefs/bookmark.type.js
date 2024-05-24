const { GraphQLObjectType, GraphQLString } = require("graphql");
const { UserType } = require("./public.types");

const BookmarkType = new GraphQLObjectType({
    name:"bookmarkType",
    fields:{
        writer:{type:UserType},
        createdAt:{type:GraphQLString}
    }
})