const router = require("express").Router();

const RoadmapController = require("../controllers/roadmapController");

router.post(
  "/generate",
  RoadmapController.generateRoadmap
);

module.exports = router;