const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { UserType, PublicCategoryType } = require("./public.types");
const { CommentType } = require("./comment.type");

const BlogType = new GraphQLObjectType({
    name: "BlogType",
    fields: {
        _id: { type: GraphQLString },
        author: { type: UserType },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        image: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: new GraphQLList(PublicCategoryType) },
        comments: { type: new GraphQLList(CommentType) },
        likes: { type: new GraphQLList(UserType) },
        disLikes: { type: new GraphQLList(UserType) },
        bookmarks: { type: new GraphQLList(UserType) },
    }
})
module.exports = {
    BlogType
}
