const autoBind = require("auto-bind");
const { PaymentModel } = require("./payment.model")

class PaymentService {
    #model
    constructor() {
        autoBind()
        this.#model = PaymentModel;
    }
    async getPaymentByAuthority(authority, verify) {
        return await this.#model.findOne({ authority, verify })
    }
    async updatePayment(authority, refId, cardHash) {
        await this.#model.updateOne({ authority }, {
            $set: {
                refId,
                cardHash
            }
        })
    }
}

module.exports = new PaymentService()