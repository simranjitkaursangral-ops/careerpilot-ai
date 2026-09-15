const express = require("express");
const cors = require("cors");

const resumeRoutes = require("./routes/resumeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const skillGapRoutes = require("./routes/skillGapRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);


// ==========================================
// ROUTES
// ==========================================

app.use(
  "/api/resume",
  resumeRoutes
);

app.use(
  "/api/job",
  jobRoutes
);

app.use(
  "/api/skill-gap",
  skillGapRoutes
);

app.use(
  "/api/roadmap",
  roadmapRoutes
);

app.use(
  "/api/interview",
  interviewRoutes
);


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
  res.send("CareerPilot Backend Running");
});


// ==========================================
// SERVER
// ==========================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});