require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Question = require('./models/Question');
const AssessmentResult = require('./models/AssessmentResult');

const { questionsData } = require('./data/questionsData'); 

const seedRoute = require('./routes/seed');
const questionsRoute = require('./routes/questions');
const assessRoute = require('./routes/assess');
const authRoute = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function initDatabase() {
  const qCount = await Question.countDocuments();

  if (qCount === 0) {
    await Question.insertMany(questionsData);
    console.log("Questions seeded automatically");
  } else {
    console.log("Questions already exist — skipping seed");
  }
}

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    await initDatabase();
  })
  .catch(err => console.error("MongoDB Connection Error:", err));

app.use('/api/seed', seedRoute);
app.use('/api/questions', questionsRoute);
app.use('/api/assess', assessRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
  res.send('CyberGuard Backend is Running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
