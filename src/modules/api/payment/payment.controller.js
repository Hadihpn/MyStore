const createHttpError = require("http-errors");
const userService = require("../../admin/user/user.service");
const paymentService = require("./payment.service")
const axios = require("axios");
const { PaymentModel } = require("./payment.model");
const { invoiceNumberGenerator } = require("../../../../../../Chapter04/myDivar/src/common/utils/function");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const autoBind = require("auto-bind");
const { StatusCodes } = require("http-status-codes");

class PaymentController {
    #service
    #userService
    constructor() {
        autoBind(this)
        this.#service = paymentService
        this.#userService = userService
    }
    async PaymentGateway(req, res, next) {
        try {
            const user = req.user
            if (user.basket.courses.length == 0 && user.basket.products.length == 0) throw new createHttpError.BadRequest("your basket is empty")
            const basket = await userService.getUserBasketDetail(user._id)
            if (!basket[0].payDetail.paymentAmount) throw new createHttpError.BadRequest("something wrong..contact admin")
            const zarinpal_request_url = "https://api.zarinpal.com/pg/v4/payment/request.json";
            const zarinpallGatewayURL = "https://www.zarinpal.com/pg/StarPay/"
            const description = "for Buying";
            const amount = basket?.payDetail?.paymentAmount;
            const zarinpal_options = {
                merchant_id: "dsfsdf",
                amount,
                description,
                metadata: {
                    email: user?.email,
                    mobile: user.mobile
                },
                callback_url: "http://127.0.0.1:3000/api/payment/verify"
            }
            const RequestResult = await axios.post(zarinpal_request_url, zarinpal_options).then(result => result.data);
            const { authority, code } = RequestResult.data;
            await PaymentModel.create({
                invoiceNmber: invoiceNumberGenerator,
                amount,
                user: user._id,
                description,
                authority,
                verify: false
            })
            if (code = 100 && authority) {
                return res.status(statusCodes.OK).json({
                    statusCode: StatusCodes.OK,
                    data: {
                        code,
                        gatewayURL: `${zarinpallGatewayURL}/${authority}`
                    }

                })
            }
            throw new createHttpError.BadRequest("entered paramters doesnt correct")
        } catch (error) {
            next(error)
        }
    }
    async verifyPayment(req, res, next) {
        try {
            const { Authority: authority } = req.query
            const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json"
            const payment = await this.#service.getPaymentByAuthority(authority, false)
            if (!payment) throw createHttpError.NotFound("cannot find any ongoing payment")
            if (payment.verify) throw createHttpError.BadRequest("transaction had been done before")
            const verifyBody = JSON.stringify({
                authority,
                amount: payment.amount,
                merchant_id: process.env.ZARINPAL_MERCHANTID
            })
            const verifyResult = await fetch(verifyURL, {
                method: "POST",
                Headers: {
                    'Content-Type': "application/json"
                },
                body: verifyBody
            }).then(result => result.json())
            if (verifyResult.data.code == 100) {
                await this.#service.updatePayment(authority, refId, cardHash)
                const courses = payment.basket.payDetail.coursesIds
                const products = payment.basket.payDetail.productsIds
                await this.#userService.updateBasketItemAfteVerifyPayment(payment.user,courses,products)
                return res.staus(StatusCodes.OK).json({
                    StatusCode: StatusCodes.OK,
                    data: {
                        message: "your payment was successful"
                    }
                })
            } else {
                throw new createHttpError.BadRequest("your payment was unSuccessful")
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports =
    new PaymentController()
