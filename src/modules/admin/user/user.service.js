const autoBind = require("auto-bind");
const { UserModel } = require("../../client/user/user.model");
const { copyObject } = require("../../../common/utils/function");

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
        const basketProduct = await UserModel.findOne({
            _id: userId,
            "basket.products.productId": productId
        })
        console.log(basketProduct);
        const product = copyObject(basketProduct)
        if (product?.basket?.products?.[0]) {
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
                _id: userId
            }, {
                $push: {
                    "basket.products": {
                        productId,
                        count: 1
                    }
                }

            })
            return "the item added to basket successfully"
        }
    }
    async addCourseToBasket(userId, coursetId) {
        const basketCourse = await UserModel.findOne({
            _id: userId,
            "basket.courses.courseId": courseId
        })
        const course = copyObject(basketCourse)
        if (course?.basket?.courses?.[0]) {
            await UserModel.updateOne({
                _id: userId,
                "basket.courses.courseId": courseId
            }, {
                $inc: {
                    "basket.courses.$.count": 1
                }
            })
            return "another item added successfully"
        } else {
            await UserModel.updateOne({
                _id: userId,
                "basket.courses.courseId": courseId
            }, {
                $push: {
                    "basket.courses": {
                        courseId,
                        count: 1
                    }
                }
            })
            return "the item added to basket successfully"
        }
    }
    async removeProductFromBasket(userId, productId) {
        console.log(productId);
        const basketProduct = await UserModel.findOne({
            _id: userId,
            "basket.products.productId": productId
        })
        console.log(basketProduct);
        const product = copyObject(basketProduct)
        if (product?.basket?.products?.[0].count > 1) {
            await UserModel.updateOne({
                _id: userId,
                "basket.products.productId": productId
            }, {
                $inc: {
                    "basket.products.$.count": -1
                }
            })
            return "another item decreased successfully"
        } else {
            await UserModel.updateOne({
                _id: userId,
                "basket.products.productId": productId
            }, {
                $pull: {
                    "basket.products": {
                        productId
                    },
                }
            })
            return "the item removed from basket successfully"
        }
    }
    async removeCourseFromBasket(userId, courseId) {
        const basketProduct = await UserModel.findOne({
            _id: userId,
            "basket.courses.courseId": courseId
        })
        const product = copyObject(basketProduct)
        if (product?.basket?.courses?.[0].count > 1) {
            await UserModel.updateOne({
                _id: userId,
                "basket.courses.courseId": courseId
            }, {
                $inc: {
                    "basket.courses.$.count": -1
                }
            })
            return "another item decreased successfully"
        } else {
            await UserModel.updateOne({
                _id: userId,
                "basket.courses.courseId": courseId
            }, {
                $pull: {
                    "basket.courses": {
                        courseId,
                    }
                }
            })
            return "the item removed to basket successfully"
        }
    }
    //#endregion
}
module.exports = new UserService()
