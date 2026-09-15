const router = require("express").Router();

const multer = require("multer");

const SkillGapController = require("../controllers/skillGapController");

const upload = multer({
  storage: multer.memoryStorage()
});

router.post(
  "/analyze",
  upload.single("resume"),
  SkillGapController.analyzeSkillGap
);

module.exports = router;