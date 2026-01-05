require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Question = require('./models/Question');
const AssessmentResult = require('./models/AssessmentResult');

const { questionsData } = require('./data/questionsData');   // <-- moved here

const seedRoute = require('./routes/seed');
const questionsRoute = require('./routes/questions');
const assessRoute = require('./routes/assess');
const authRoute = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// ===============================
// 🚀 AUTO DATABASE INITIALIZER
// ===============================
async function initDatabase() {

  // 1️⃣ Seed Questions if DB empty
  const qCount = await Question.countDocuments();

  if (qCount === 0) {
    await Question.insertMany(questionsData);
    console.log("✔ Questions seeded automatically");
  } else {
    console.log("✔ Questions already exist — skipping seed");
  }


  // 2️⃣ Ensure default quotation exists
  const quotationCount = await AssessmentResult.countDocuments();

  if (quotationCount === 0) {

    await AssessmentResult.create({
      user: null,
      score: 0,
      total_questions: 0,
      max_possible_score: 0,
      percentage: 0,
      risk_level: "Not Assessed",
      category_scores: [],
      answers: []
    });

    console.log("✔ Default quotation created");

  } else {
    console.log("✔ Quotation records already exist — skipping create");
  }
}


// ===============================
// 🟢 CONNECT DB + RUN INITIALIZER
// ===============================
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    await initDatabase();
  })
  .catch(err => console.error("MongoDB Connection Error:", err));


// ===============================
// 🌐 ROUTES
// ===============================
app.use('/api/seed', seedRoute);
app.use('/api/questions', questionsRoute);
app.use('/api/assess', assessRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
  res.send('CyberGuard Backend is Running');
});


// ===============================
// 🚀 START SERVER
// ===============================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
