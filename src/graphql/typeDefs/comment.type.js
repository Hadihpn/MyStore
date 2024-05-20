const { GraphQLObjectType, GraphQLString, graphql, GraphQLBoolean, GraphQLList } = require("graphql");
const { UserType, AnyType } = require("./public.types");
// const AnswerCommentType = new GraphQLObjectType({
//     name: "answerCommentType",
//     fields: {
//         writer: { type: UserType },
//         text: { type: GraphQLString },
//         show: { type: GraphQLBoolean },
//     }
// })
const CommentType = new GraphQLObjectType({
    name: "commentType",
    fields: {
        writer: { type: UserType },
        text: { type: GraphQLString },
        // answer: { type: new GraphQLList(AnswerCommentType) },
        replyTo: { type: GraphQLString },
        show: { type: GraphQLBoolean },
        // openToComment: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },

    }
})

module.exports = {
    CommentType
}