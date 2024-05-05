const { GraphQLList } = require("graphql");
const { ProductType } = require("../typeDefs/product.type");
const productServices = require("../../modules/admin/product/product.services");
const { ProductModel } = require("../../modules/admin/product/product.model");

const ProductResolver = {
    type: new GraphQLList(ProductType),
    resolve: async () => {
        return await productServices.getProducts()
        // return await ProductModel.find({}).populate([{path:"supplier"}])
    }
}
module.exports = {
    ProductResolver
}