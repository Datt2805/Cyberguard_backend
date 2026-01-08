const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema(
  {
    option_key: String,
    option_text: String,
    score: Number,
  },
  { _id: false }
);

const QuestionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    category_id: Number,
    category_name: String,
    question_text: String,
    options: [OptionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
