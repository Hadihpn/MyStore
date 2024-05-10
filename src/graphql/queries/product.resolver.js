const { GraphQLList, GraphQLString } = require("graphql");
const { ProductType } = require("../typeDefs/product.type");
const productServices = require("../../modules/admin/product/product.services");
const { ProductModel } = require("../../modules/admin/product/product.model");

const ProductResolver = {
    type: new GraphQLList(ProductType),
    args: {
        category: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const {category} = args;
        const findQuery = category?{category}:"";
        return await productServices.getProductsByQuery(findQuery)
        // return await ProductModel.find({}).populate([{path:"supplier"}])
    }
}
module.exports = {
    ProductResolver
}