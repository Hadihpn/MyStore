const { GraphQLObjectType, GraphQLString } = require("graphql");
const { UserType } = require("./public.types");

const LikeType = new GraphQLObjectType({
    name:"likeType",
    fields:{
        writer:{type:UserType},
        createdAt:{type:GraphQLString}
    }
})