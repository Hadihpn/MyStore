const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AuthorType } = require("./public.types");

const BlogType = new GraphQLObjectType({
    name: "blogType",
    fields: {
        _id: { type: GraphQLString },
        author: { type: AuthorType },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        image: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: new GraphQLList(GraphQLString) },
    }
})
module.exports ={
    BlogType
}
