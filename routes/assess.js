const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const AssessmentResult = require("../models/AssessmentResult");
const { protect } = require("../middleware/auth");

// Grade calculator
const calculateGrade = (percentage) => {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
};

/**
 * POST /api/assess
 * Submit assessment answers
 */
router.post("/", protect, async (req, res) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: "Invalid answers payload" });
    }

    // Fetch all questions once
    const questions = await Question.find({});
    if (!questions.length) {
      return res.status(500).json({ error: "No questions found" });
    }

    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));

    let totalScore = 0;
    let maxPossibleScore = 0;
    const categoryTracker = {};
    const processedAnswers = [];

    // Pre-calc max scores
    questions.forEach((q) => {
      if (!categoryTracker[q.category_name]) {
        categoryTracker[q.category_name] = { score: 0, max: 0 };
      }
      categoryTracker[q.category_name].max += 3; // max per question
      maxPossibleScore += 3;
    });

    // Process submitted answers
    for (const ans of answers) {
      const question = questionMap.get(ans.questionId);
      if (!question) continue;

      const selectedOption = question.options[ans.selectedOption];
      const points = selectedOption ? selectedOption.score : 0;

      totalScore += points;
      categoryTracker[question.category_name].score += points;

      processedAnswers.push({
        questionId: question._id,
        questionText: question.question_text,

        selectedOption: selectedOption
          ? {
              option_key: selectedOption.option_key,
              option_text: selectedOption.option_text,
              score: selectedOption.score,
            }
          : null,

        pointsAwarded: points,
        quotation: ans.quotation || null,
      });
    }

    // Build category scores
    const categoryScores = Object.entries(categoryTracker).map(
      ([name, data]) => {
        const percentage =
          data.max > 0 ? Math.round((data.score / data.max) * 100) : 0;

        return {
          category_name: name,
          score: data.score,
          max_score: data.max,
          percentage,
          risk: calculateGrade(percentage),
        };
      }
    );

    // Overall percentage
    const overallPercentage =
      maxPossibleScore > 0
        ? Math.round((totalScore / maxPossibleScore) * 100)
        : 0;

    const overallGrade = calculateGrade(overallPercentage);

    // SAVE USING NEW SCHEMA
    const result = await AssessmentResult.create({
      user: req.user._id,

      summary: {
        score: totalScore,
        total_questions: questions.length,
        max_possible_score: maxPossibleScore,
        percentage: overallPercentage,
        risk_level: overallGrade,
      },

      category_scores: categoryScores,
      answers: processedAnswers,
    });

    res.json({
      success: true,
      resultId: result._id,
      data: result,
    });
  } catch (err) {
    console.error("ASSESSMENT SUBMIT ERROR:", err);
    res.status(500).json({ error: "Assessment submission failed" });
  }
});

// GET /api/assess/history Fetch user assessment history
router.get("/history", protect, async (req, res) => {
  try {
    const history = await AssessmentResult.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.json(history);
  } catch (err) {
    console.error("FETCH HISTORY ERROR:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;
