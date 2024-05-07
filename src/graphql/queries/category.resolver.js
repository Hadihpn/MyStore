const { GraphQLList, GraphQLString } = require("graphql");
const categoryServices = require("../../modules/admin/category/category.services");
const { CategoryType } = require("../typeDefs/category.type");

const CategoryResolver = {
    type: new GraphQLList(CategoryType),
    resolve: async () => {
        return await categoryServices.getAllCategory()
    }
}
const CategoryChildResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        parent: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { parent } = args;
        if(!parent) return {}
        return await categoryServices.getChildOfParent(parent)
    }
}
module.exports = {
    CategoryResolver,
    CategoryChildResolver
}