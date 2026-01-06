const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const AssessmentResult = require('../models/AssessmentResult');
const { protect } = require('../middleware/auth');

// Helper to calculate Grade
const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B'; 
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D'; 
  return 'F';                       
};

// POST: Submit Answers & Calculate Score
router.post('/', protect, async (req, res) => {
  try {
    const userAnswers = req.body.answers;
    
    // Debugging Log
   x

    if (!userAnswers || !Array.isArray(userAnswers)) {
      return res.status(400).json({ error: "Invalid data format." });
    }

    const allQuestions = await Question.find({});
    if (allQuestions.length === 0) {
      return res.status(500).json({ error: "No questions found." });
    }

    const questionMap = new Map(allQuestions.map(q => [q._id.toString(), q]));

    let totalScore = 0;
    let maxPossibleScore = 0;
    const categoryTracker = {};

    // Calculate Max Scores
    allQuestions.forEach(q => {
      if (!categoryTracker[q.category_name]) {
        categoryTracker[q.category_name] = { score: 0, max: 0 };
      }
      categoryTracker[q.category_name].max += 3;
      maxPossibleScore += 3;
    });

    const processedAnswers = [];

    // Process Answers
    userAnswers.forEach(ans => {
      const question = questionMap.get(ans.questionId);

      if (question) {
        // Safe check for options
        const selectedOption = question.options[ans.selectedOption];
        const points = selectedOption ? selectedOption.score : 0;
        const catName = question.category_name;

        totalScore += points;

        if (categoryTracker[catName]) {
          categoryTracker[catName].score += points;
        }

        processedAnswers.push({
          questionId: ans.questionId,
          selectedOption: ans.selectedOption,
          pointsAwarded: points
        });
      }
    });

    // Format Category Results with Grades
    const categoryBreakdown = Object.keys(categoryTracker).map(catName => {
      const data = categoryTracker[catName];
      const pct = data.max > 0 ? (data.score / data.max) * 100 : 0;
      
      return {
        category_name: catName,
        score: data.score,
        max_score: data.max,
        percentage: Math.round(pct),
        risk: calculateGrade(pct)
      };
    });

    // Calculate Overall Grade
    const totalPercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
    const overallGrade = calculateGrade(totalPercentage);

    const result = await AssessmentResult.create({
      user: req.user._id,
      score: totalScore,
      total_questions: allQuestions.length,
      max_possible_score: maxPossibleScore,
      percentage: Math.round(totalPercentage),
      risk_level: overallGrade,
      category_scores: categoryBreakdown,
      answers: processedAnswers
    });

    res.json({ success: true, resultId: result._id, data: result });

  } catch (error) {
    console.error("CRITICAL ERROR IN SUBMISSION:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/history', protect, async (req, res) => {
  try {
    // Only fetch history for the logged-in user
    const history = await AssessmentResult.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;