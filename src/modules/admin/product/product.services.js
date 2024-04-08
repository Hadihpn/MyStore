const autoBind = require("auto-bind");
const { ProductModel } = require("./product.model");
class ProductServices {
  #model
  constructor() {
    autoBind(this);
    this.#model =  ProductModel
  }
  async getProducts(){
    return this.#model.find()
  }
  async createProduct(productDto){
     await this.#model.create(productDto)
  }
  async getProductById(id){
    const product = await this.#model.findById(id)
    return product;
  }
 
}

module.exports = new ProductServices();
