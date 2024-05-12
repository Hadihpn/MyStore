const { GraphQLObjectType, GraphQLString, graphql, GraphQLBoolean } = require("graphql");
const { UserType } = require("./public.types");
const parentOfCommentType = new GraphQLObjectType({
    name: "parentOfCommentType",
    fields: {
        writer: { type: UserType },
        text: { type: GraphQLString },
        parent: { type: GraphQLString },
        show: { type: GraphQLBoolean },
        openToComment: { type: GraphQLBoolean }

    }
})
const CommentType = new GraphQLObjectType({
    name: "CommentType",
    fields: {
        writer: { type: UserType },
        text: { type: GraphQLString },
        parent: { type: parentOfCommentType },
        show: { type: GraphQLBoolean },
        openToComment: { type: GraphQLBoolean }

    }
})
module.exports = {
    CommentType
}