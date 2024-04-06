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
}

module.exports = new ProductServices();
