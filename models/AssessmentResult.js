const mongoose = require("mongoose");

const assessmentResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    summary: {
      score: Number,
      total_questions: Number,
      max_possible_score: Number,
      percentage: Number,
      grade: String,
      risk_level: String,
      risk_color: String,
    },
    category_scores: [
      {
        category_name: String,
        score: Number,
        max_score: Number,
        percentage: Number,
        grade: String,
        risk: String,
        color: String,
      },
    ],
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        questionText: String,
        selectedOption: {
          option_key: String,
          option_text: String,
          score: Number,
        },
        pointsAwarded: Number,

        question: {
          type: String,
          default: null
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssessmentResult", assessmentResultSchema);
