const { default: mongoose, Types, model } = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    verify: { type: Boolean, default: false },
    authority: { type: String },
    authority: { type: String },
    amount: { type: Number },
    description: { type: String, default: "to buying" },
    invoiceNmber: { type: String },
    user: { type: Types.ObjectId, ref: "user" },
    basket:{type:Object,default:{}}
}, {
    timestamps:true,
    toJSON: {
        virtuals: true
    }
})

const PaymentModel = model("Payment", PaymentSchema);
module.exports = { PaymentModel };