const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { UserType, PublicCategoryType } = require("./public.types");
const EpisodeType = new GraphQLObjectType({
    name:"EpisodeType",
    fields:{
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        type: { type: GraphQLString },
        time: { type: GraphQLString },
       videoAddress: { type: GraphQLString },
    }
})
const ChapterType = new GraphQLObjectType({
    name:"ChapterType",
    fields:{
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        episodes:{type:new GraphQLList(EpisodeType)}

    }
})
const CourseType = new GraphQLObjectType({
    name:"CourseType",
    fields:{
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        images: { type:new GraphQLList(GraphQLString) },
        tags: { type: new GraphQLList(GraphQLString) },
        teacher: { type: UserType },
        category: { type: PublicCategoryType },
        price: { type: GraphQLInt },
        type: { type: GraphQLString },
        count: { type: GraphQLInt },
        discount: { type: GraphQLString },
        type: { type: GraphQLString },
        status: { type: GraphQLString },
        chapters:{type:new GraphQLList(ChapterType)},
        

    }
})
module.exports = {
    CourseType
}