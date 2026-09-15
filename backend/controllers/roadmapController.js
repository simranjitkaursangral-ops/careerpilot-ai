const axios = require("axios");

const generateRoadmap = async (req, res) => {
  try {
    console.log("========== CAREER ROADMAP ==========");

    console.log("BODY:", req.body);

    const { targetRole } = req.body;

    if (!targetRole || !targetRole.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide your target role"
      });
    }

    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/roadmap",
      {
        target_role: targetRole.trim()
      }
    );

    console.log(
      "PYTHON RESPONSE:",
      aiResponse.data
    );

    return res.status(200).json({
      success: true,
      message: "Career roadmap generated successfully",
      roadmap: aiResponse.data
    });

  } catch (error) {
    console.log(
      "ROADMAP ERROR:",
      error.message
    );

    if (error.response) {
      console.log(
        "PYTHON STATUS:",
        error.response.status
      );

      console.log(
        "PYTHON RESPONSE:",
        error.response.data
      );
    }

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.message
    });
  }
};

module.exports = {
  generateRoadmap
};