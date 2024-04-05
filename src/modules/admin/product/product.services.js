const autoBind = require("auto-bind");
const { ProductModel } = require("./product.model");
class ProductServices {
  #model
  constructor() {
    autoBind(this);
    this.#model =  ProductModel
  }
}

module.exports = new ProductServices();
