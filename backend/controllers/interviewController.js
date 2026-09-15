const axios = require("axios");

const generateQuestion = async (req, res) => {
  try {
    const { targetRole } = req.body;

    if (!targetRole || !targetRole.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide your target role"
      });
    }

    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/interview/question",
      {
        target_role: targetRole.trim()
      }
    );

    return res.status(200).json({
      success: true,
      question: aiResponse.data.question
    });

  } catch (error) {
    console.log(
      "INTERVIEW QUESTION ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.message
    });
  }
};


const evaluateAnswer = async (req, res) => {
  try {
    const {
      targetRole,
      question,
      answer
    } = req.body;

    if (!targetRole || !question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Target role, question and answer are required"
      });
    }

    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/interview/evaluate",
      {
        target_role: targetRole,
        question,
        answer
      }
    );

    return res.status(200).json({
      success: true,
      evaluation: aiResponse.data
    });

  } catch (error) {
    console.log(
      "INTERVIEW EVALUATION ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.message
    });
  }
};


module.exports = {
  generateQuestion,
  evaluateAnswer
};