const router = require("express").Router();

const InterviewController = require("../controllers/interviewController");

router.post(
  "/question",
  InterviewController.generateQuestion
);

router.post(
  "/evaluate",
  InterviewController.evaluateAnswer
);

module.exports = router;