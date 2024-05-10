const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { PublicCategoryType, AnyType } = require("./public.types");

const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        slug: { type: GraphQLString },
        icon: { type: GraphQLString },
        parent: { type: GraphQLString },
        parents: { type: new GraphQLList(GraphQLString) },
        children: { type: new GraphQLList(AnyType) },
    }
})
module.exports ={
    CategoryType
}