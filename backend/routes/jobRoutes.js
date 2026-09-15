const router = require("express").Router();

const multer = require("multer");
const JobController = require("../controllers/JobController");

const upload = multer({
  storage: multer.memoryStorage()
});

router.post(
  "/match",
  upload.single("resume"),
  JobController.matchJob
);

module.exports = router;