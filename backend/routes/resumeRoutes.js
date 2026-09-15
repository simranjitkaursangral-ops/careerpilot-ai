const router = require("express").Router();

const multer = require("multer");
const ResumeController = require("../controllers/resumeController");

const upload = multer({
  storage: multer.memoryStorage()
});

router.post(
  "/analyze",
  upload.single("resume"),
  ResumeController.analyzeResume
);

module.exports = router;