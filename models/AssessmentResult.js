const mongoose = require('mongoose');

const assessmentResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: Number,
  total_questions: Number,
  max_possible_score: Number,
  percentage: Number,
  risk_level: String,
  category_scores: [
    {
      category_name: String,
      score: Number,
      max_score: Number,
      percentage: Number,
      risk: String
    }
  ],
  answers: [
    {
      questionId: String,
      selectedOption: Number,
      pointsAwarded: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('AssessmentResult', assessmentResultSchema);