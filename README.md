# 🚀 CareerPilot AI

### AI Career Intelligence Platform

CareerPilot AI is an AI-powered career assistance platform designed to help students and job seekers understand their career readiness, identify skill gaps, match their resumes with job descriptions, build career roadmaps, and practice technical interviews.

The platform combines a **React frontend**, **Node.js/Express backend**, and **Python Flask AI service** to provide an end-to-end career intelligence experience.

---

## ✨ Features

### 📄 Resume Analyzer

Upload your resume in PDF format and get:

* Resume score
* Detected technical skills
* Total skills detected
* Basic resume analysis

### 💼 AI Job Matcher

Upload your resume and paste a job description to discover:

* Job match percentage
* Matched skills
* Missing skills
* Required job skills
* Resume skills

The system supports different skill spellings such as:

* React / ReactJS
* Node.js / NodeJS
* MongoDB / Mongo DB
* Express / Express.js
* Scikit-learn / sklearn

### 🧠 Skill Gap Analyzer

Enter your target career and upload your resume to discover:

* Current skills
* Required skills
* Missing skills
* Recommended skills
* Career readiness score

Supported career paths include:

* MERN Developer
* Frontend Developer
* Backend Developer
* Python Developer
* Data Scientist
* Machine Learning Engineer

### 🗺️ AI Career Roadmap

Enter your target career and receive a structured roadmap containing:

* Learning phases
* Required skills
* Suggested duration
* Practical tasks
* Project preparation

### 🎤 AI Mock Interview

Practice interview questions based on your target career.

The system provides:

* AI-generated interview questions
* Answer submission
* Interview score
* Feedback
* Strength analysis
* Improvement suggestions
* Next interview question

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │      Port 5173      │
                    └──────────┬──────────┘
                               │
                              Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Node.js + Express  │
                    │      Port 5000      │
                    └──────────┬──────────┘
                               │
                         HTTP Requests
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Python Flask AI   │
                    │      Port 8000      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   NLP / AI Logic    │
                    │ Skill Detection     │
                    │ Job Matching        │
                    │ Career Analysis     │
                    └─────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router
* Axios
* HTML5
* CSS3
* Responsive UI

## Backend

* Node.js
* Express.js
* Axios
* Multer
* PDF parsing

## AI Service

* Python
* Flask
* NLP-based skill detection
* Skill matching
* Rule-based career analysis

## Development Tools

* Git
* GitHub
* VS Code
* Postman

---

# 📁 Project Structure

```text
careerpilot-ai/
│
├── frontendd/
│   │
│   ├── src/
│   │   ├── component/
│   │   │   └── user/
│   │   │       ├── Home/
│   │   │       ├── ResumeAnalyzer/
│   │   │       ├── JobMatcher/
│   │   │       ├── SkillGap/
│   │   │       ├── CareerRoadmap/
│   │   │       └── MockInterview/
│   │   │
│   │   ├── layout/
│   │   │   └── user/
│   │   │       └── Layout.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── resumeController.js
│   │   ├── jobController.js
│   │   ├── skillGapController.js
│   │   ├── roadmapController.js
│   │   └── interviewController.js
│   │
│   ├── routes/
│   │   ├── resumeRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── skillGapRoutes.js
│   │   ├── roadmapRoutes.js
│   │   └── interviewRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── ai_service/
│   ├── app.py
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

---

# 🔌 API Endpoints

## Resume Analyzer

```text
POST /api/resume/analyze
```

Upload:

```text
resume: PDF
```

---

## Job Matcher

```text
POST /api/job/match
```

Upload:

```text
resume: PDF
jobDescription: Text
```

---

## Skill Gap Analyzer

```text
POST /api/skill-gap/analyze
```

Upload:

```text
resume: PDF
targetRole: Text
```

---

## Career Roadmap

```text
POST /api/roadmap/generate
```

Request:

```json
{
  "targetRole": "MERN Developer"
}
```

---

## Mock Interview Question

```text
POST /api/interview/question
```

Request:

```json
{
  "targetRole": "MERN Developer"
}
```

---

## Mock Interview Evaluation

```text
POST /api/interview/evaluate
```

Request:

```json
{
  "targetRole": "MERN Developer",
  "question": "What is the difference between useState and useEffect in React?",
  "answer": "..."
}
```

---

# ⚙️ Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/careerpilot-ai.git
```

```bash
cd careerpilot-ai
```

---

# 2. Frontend Setup

Go to the frontend folder:

```bash
cd frontendd
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 3. Backend Setup

Open another terminal.

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

# 4. AI Service Setup

Open another terminal.

```bash
cd ai_service
```

Create and activate a virtual environment:

### Windows

```bash
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Start the AI service:

```bash
python app.py
```

AI service runs on:

```text
http://127.0.0.1:8000
```

---

# ▶️ Running the Complete Project

Run all three services simultaneously:

### Terminal 1 — Frontend

```bash
cd frontendd
npm run dev
```

### Terminal 2 — Backend

```bash
cd backend
node server.js
```

### Terminal 3 — AI Service

```bash
cd ai_service
python app.py
```

Then open:

```text
http://localhost:5173
```

---

# 🔄 Application Flow

### Resume Analysis

```text
User
 ↓
Upload Resume
 ↓
React
 ↓
Node.js / Express
 ↓
PDF Text Extraction
 ↓
Python AI Service
 ↓
Skill Detection
 ↓
Resume Score
 ↓
React Result
```

### Job Matching

```text
Resume + Job Description
            ↓
        React
            ↓
       Node.js API
            ↓
      Python AI Service
            ↓
     Skill Detection
            ↓
  Matched + Missing Skills
            ↓
       Match Score
```

### Skill Gap

```text
Resume + Target Role
          ↓
      Skill Detection
          ↓
 Compare With Role Skills
          ↓
    Missing Skills
          ↓
 Career Readiness Score
```

---

# 🎯 Project Goals

CareerPilot AI aims to help students and job seekers:

* Understand their current technical skills
* Evaluate their career readiness
* Identify missing skills
* Compare themselves with job requirements
* Create structured learning plans
* Practice interview questions
* Improve their preparation before applying for jobs

---

# 🚀 Future Improvements

Future versions can include:

* Real LLM integration
* Personalized AI career recommendations
* Resume improvement suggestions
* Job search API integration
* User authentication
* User profile
* Analysis history
* Personalized dashboards
* Interview question difficulty levels
* Voice-based mock interviews
* Advanced resume scoring
* ML-based job recommendation
* Deployment and production infrastructure

---

# 👩‍💻 Author

**Simranjit Kaur**

B.Tech Computer Science Engineering

CareerPilot AI — AI Career Intelligence Platform

---

## ⭐ Project

If you find CareerPilot AI useful, consider giving the repository a ⭐ on GitHub.
