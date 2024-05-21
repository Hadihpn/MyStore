const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { UserType } = require("./public.types");
const AnswerType = new GraphQLObjectType({
    name:"answerType",
    fields:{
        user:{type:UserType},
        text:{type:GraphQLString},
        show:{type:GraphQLBoolean},
        createdAt:{type:GraphQLString}
    }
})
const QuestionType = new GraphQLObjectType({
    name:"questionType",
    fields:{
        user:{type:UserType},
        text:{type:GraphQLString},
        answers:{type:new GraphQLList(AnswerType)},
        show:{type:GraphQLBoolean},
        openToAnswer:{type:GraphQLBoolean},
        createdAt:{type:GraphQLString}
    }
})
module.exports = {
    QuestionType
}