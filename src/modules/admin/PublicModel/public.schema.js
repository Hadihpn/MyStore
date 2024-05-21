const { Schema, Types, default: mongoose } = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    user: { type: Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true },
    show: { type: Boolean, required: true, default: false },
}, {
    timestamps: { createdAt: true }
})

const QuestionSchema = new mongoose.Schema({
    user: { type: Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true },
    show: { type: Boolean, required: true, default: false },
    openToAnswer: { type: Boolean, default: true },
    answers: { type: [AnswerSchema], default: [] }
}, {
    timestamps: { createdAt: true }
})

module.exports = {
    QuestionSchema
}
