const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { questionsData } = require('../data/questionsData');

router.post('/', async (req, res) => {
  try {
    const count = await Question.countDocuments();

    if (count > 0) {
      return res.json({
        message: "Questions already exist — seeding skipped",
        count
      });
    }

    await Question.insertMany(questionsData);

    res.json({
      message: "Questions seeded successfully",
      count: questionsData.length
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
