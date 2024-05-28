const autoBind = require("auto-bind");
const { UserModel } = require("../../client/user/user.model");
const { copyObject, calculateDiscount } = require("../../../common/utils/function");
const createHttpError = require("http-errors");
const { disconnect } = require("mongoose");

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
            throw new createHttpError.BadRequest("you already purchase this course")
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
                $pull: {
                    "basket.courses": {
                        courseId,
                    }
                }
            })
            return "the item removed to basket successfully"
        }
    }

    async getUserBasketDetail(userId) {
        const details = await this.#model.aggregate([
            {
                $match: { _id: userId }
            }, {
                $project: { basket: 1 }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "basket.products.productId",
                    foreignField: "_id",
                    as: "productDetail"
                },
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "basket.courses.courseId",
                    foreignField: "_id",
                    as: "courseDetail"
                },
            },
            {
                $addFields: {
                    "productDetail.basketDetail": {
                        $function: {
                            body: function (productDetail, products) {
                                productDetail.map(function (product) {
                                    const count = products.find(item => item.productId.valueOf() === product._id.valueOf()).count
                                    const totalPrice = count * product.price
                                    return {
                                        ...product,
                                        basketCount: count,
                                        totalPrice,
                                        finalPrice: ((totalPrice * (100 - product.discount)) / 100)
                                    }
                                })
                            },
                            args: ["$productDetail", "$basket.products"],
                            lang: "js"
                        }
                    },
                    "courseDetail.basketDetail": {
                        $function: {
                            body: function (courseDetail) {
                                return courseDetail.map(function (course) {
                                    const totalPrice = course.price
                                    return {
                                        ...course,
                                        totalPrice,
                                        finalPrice: ((totalPrice * (100 - course.discount)) / 100)
                                    }
                                })
                            },
                            args: ["$courseDetail"],
                            lang: "js"
                        }
                    },
                    "payDetail": {
                        $function: {
                            body: function (courseDetail, productDetail, products) {
                                const courseAmount = courseDetail.reduce(function (total, course) {
                                    return total + ((course.price * (100 - course.discount)) / 100)
                                }, 0);
                                const productAmount = productDetail.reduce(function (total, product) {
                                    const count = products.find(item => item.productId.valueOf() == product._id.valueOf()).count
                                    const totalPrice = count * product.price;
                                    return total + ((totalPrice * (100 - product.discount)) / 100)
                                }, 0);
                                const courseIds = courseDetail.map(course => course._id.valueOf());
                                const productIds = productDetail.map(product => product._id.valueOf());
                                return {
                                    courseAmount,
                                    productAmount,
                                    paymentAmount: courseAmount + productAmount,
                                    courseIds,
                                    productIds
                                }

                            },
                            args: ["$courseDetail","$productDetail","$basket.products"],
                            lang: "js"
                        }
                    }
                },
            }
        ])
        return details
    }
    //#endregion
}
module.exports = new UserService()
