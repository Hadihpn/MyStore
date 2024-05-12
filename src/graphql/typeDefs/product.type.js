const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { UserType, PublicCategoryType } = require("./public.types");

const ProductType = new GraphQLObjectType({
    name:"ProductType",
    fields:{
        _id: { type: GraphQLString },
        
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        images: { type:new GraphQLList(GraphQLString) },
        tags: { type: new GraphQLList(GraphQLString) },
        supplier: { type: UserType },
        category: { type: PublicCategoryType },
        price: { type: GraphQLInt },
        type: { type: GraphQLString },
        count: { type: GraphQLInt },
        discount: { type: GraphQLString },
        type: { type: GraphQLString },

    }
})
module.exports = {
    ProductType
}