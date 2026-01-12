🔐 CyberGuard Backend — Authentication & Assessment Service

CyberGuard Backend is a lightweight Node.js + Express server that provides REST APIs for:

User Signup

User Login / Authentication

Storing Assessment Results

Sending Stored Results to the Frontend Dashboard

This backend works as the Auth & Assessment module for the CyberGuard platform.

🎯 Purpose of This Backend

This backend is mainly responsible for:

✔ Managing user accounts
✔ Secure login & signup
✔ Saving assessment test results
✔ Sharing results with the frontend dashboard

⚠️ Note

This backend does not perform scanning — it only handles authentication and result storage.

🧰 Tech Stack

Node.js

Express

JavaScript

npm

dotenv

MongoDB (Local Database)

## 📂 Project Structure

```
cyberguard_backend/
│
├── data/
│   └── questionsData.js        # Static assessment questions
│
├── middleware/
│   └── auth.js                 # JWT authentication middleware
│
├── models/
│   ├── AssessmentResult.js     # Stores user assessment results
│   ├── Question.js             # Assessment questions schema
│   └── user.js                 # User schema
│
├── routes/
│   ├── assess.js               # Assessment submission & scoring
│   ├── auth.js                 # Login & register routes
│   ├── questions.js            # Fetch assessment questions
│   └── seed.js                 # Seed questions into database
│
├── .env                        # Environment variables
├── .gitignore
├── index.js                    # Application entry point
├── package.json
├── package-lock.json
└── README.md
```


🚀 How to Clone & Run in VS Code
1️⃣ Clone the Repository
git clone https://github.com/Datt2805/Cyberguard_backend.git

2️⃣ Open the Project
cd Cyberguard_backend
code .

3️⃣ Install Dependencies
npm install

🗂️ Create .env File (Required)

Create a file named .env in the project root:

PORT=5000
MONGODB_URI=mongodb+srv://cyberguard_user:78q9SGKUG2Gn4jyZ@cluster0.luvo6jl.mongodb.net/
# mongodb://localhost:27017/cyberguard
JWT_SECRET=somereallylongsecretkey123
NODE_ENV=production


🔹 These values are for local development only

▶️ Start the Server
Normal Mode
npm start

Development Mode (if nodemon is added)
npm run dev

🌐 API Base URL
http://localhost:5000

🧾 Core APIs — High Level
👤 Authentication APIs

User Signup

User Login

Store User Details

📊 Assessment Result APIs

Save Assessment Results

Fetch User Result History

Send Results to Dashboard Frontend

These APIs are used by the CyberGuard Frontend UI.

🛠 Useful npm Scripts
Command	Description
npm install	Install dependencies
npm start	Run backend server
npm run dev	Run in dev mode (optional)