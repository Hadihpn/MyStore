const autoBind = require("auto-bind");
const { UserModel } = require("../../client/user/user.model");

class UserService {
    #model
    constructor() {
        autoBind(this)
        this.#model = UserModel;
    }
    async getAllUser(search) {
        return await this.#model.find(search)
    }
    async updateUserProfile(userId, data) {
        return await this.#model.updateOne({ "_id": userId }, {
            $set: data
        })
    }
    //#region Basket
    async addProductToBasket(userId, productId) {
        const product = await UserModel.findOne({
            _id: userId,
            "basket.products.productId": productId
        })
        if (product) {
            await UserModel.updateOne({
                _id: userId,
                "basket.products.productId": productId
            }, {
                $inc: {
                    "basket.products.$.count": 1
                }
            })
            return "another item added successfully"
        } else {
            await UserModel.updateOne({
                _id: userId,
                "basket.products.productId": productId
            }, {
                $push: {
                    productId,
                    count: 1
                }
            })
            return "the item added to basket successfully"
        }
    }
    //#endregion
}
module.exports = new UserService()
