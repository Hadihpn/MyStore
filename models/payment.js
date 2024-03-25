const {Schema,model} = require("mongoose");

const PaymentSchema = new Schema({

})

const PaymentModel = model("payment",PaymentSchema);
module.exports = {PaymentModel};