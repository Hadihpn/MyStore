const autoBind = require("auto-bind");
const { ProductModel } = require("./product.model");
const createHttpError = require("http-errors");
class ProductServices {
  #model
  constructor() {
    autoBind(this);
    this.#model = ProductModel
  }
  async getProducts(findQuery) {
    if (!findQuery || findQuery == "") return await this.#model.find()
    return await this.#model.find({
      $text: {
        $search: findQuery
      }
    })
  }
  async getProductsByQuery(findQuery) {
    if (!findQuery || findQuery == "") return await this.#model.find()
    return await this.#model.find(findQuery)
  }
  async createProduct(productDto) {
    await this.#model.create(productDto)
  }
  async getProductById(id) {
    const product = await this.#model.findById(id)
    return product;
  }
  async deleteProduct(_id) {
    const product = await this.#model.findById(_id);
    if (product.dislikes > 0 || product.comments.length > 0 || product.likes > 0 || product.bookmarks > 0) throw new createHttpError.BadRequest("محصول مورد نظر قابل حذف نمیباشد")
    const deletedCount = await this.#model.deleteOne({ _id });
    if (deletedCount == 0) throw new createHttpError.NotFound("محصول موردنظر یافت نشد")
    return product.images;
  }
  async editProduct(id, data) {
    const result = await this.#model.updateOne({ _id: id }, { $set: data })
    return result;
  }
  async checkExist(_id) {
    return await this.#model.exists({ _id: _id })
}
  async checkExistRepliedComment(commentId) {
    const product = await this.#model.findOne({ "comments._id": commentId }, { "comments.$": 1 });
    if (product) return true;
    return false;
  }
  async checkExistRepliedQuestion(questionId) {
    const product = await this.#model.findOne({ "questions._id": questionId }, { "questions.$": 1 });
    if (product) return true;
    return false;
  }
  async addProductComment(productId, comment) {
    return await this.#model.updateOne({ _id: productId },
      {
        $push: {
          comments: {
            user: comment.user,
            text: comment.text,
            show: comment.show,
            replyTo: comment.replyTo
          }

        }
      });
  }
}

module.exports = new ProductServices();
