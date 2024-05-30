const createHttpError = require("http-errors");
const userService = require("../../admin/user/user.service");
const paymentService = require("./payment.service")
const axios = require("axios")

class PaymentController {
    #service
    constructor() {
        this.#service = paymentService
    }
    async PaymentGateway(req, res, next) {
        try {
            const user = req.user
            if (user.basket.courses.length == 0 && user.basket.products.length == 0) throw new createHttpError.BadRequest("your basket is empty")
            const basket = await userService.getUserBasketDetail(user._id)
            if (!basket[0].payDetail.paymentAmount) throw new createHttpError.BadRequest("something wrong..contact admin")
            const zarinpal_request_url = "https://api.zarinpal.com/pg/v4/payment/request.json";
            const zarinpallGatewayURL = "https://www.zarinpal.com/pg/StarPay/"
            const zarinpal_options = {
                merchant_id: "dsfsdf",
                amount: basket?.payDetail?.paymentAmount,
                description: "for buying",
                metadata: {
                    email: user?.email,
                    mobile: user.mobile
                },
                callback_url: "http://127.0.0.1:3000/api/payment/verify"
            }
            const RequestResult = await axios.post(zarinpal_request_url, zarinpal_options).then(result => result.data);
            if (RequestResult.data.code = 100 && RequestResult.data.authority) {
                const { authority, code } = RequestResult.data;
                return res.json({
                    code,
                    gatewayURL: `${zarinpallGatewayURL}/${authority}`
                })
            }
            throw new createHttpError.BadRequest("entered paramters doesnt correct")
        } catch (error) {
            next(error)
        }
    }
    verifyPayment(req, res, next) {
        try {
            return res.json({
                body: req.body,
                params: req.params,
                query: req.query
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports =
    new PaymentController()
