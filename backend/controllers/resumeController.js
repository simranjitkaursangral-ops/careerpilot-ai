const { PDFParse } = require("pdf-parse");
const axios = require("axios");

const analyzeResume = async (req, res) => {
  try {
    console.log("1. Resume request received");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume"
      });
    }

    console.log("2. File received:", req.file.originalname);

    const parser = new PDFParse({
      data: req.file.buffer
    });

    const data = await parser.getText();

    const resumeText = data.text;

    console.log("3. PDF parsed successfully");
    console.log("4. Resume text length:", resumeText.length);

    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/analyze",
      {
        resume_text: resumeText
      }
    );

    console.log("5. Python AI response received");

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      aiResult: aiResponse.data
    });

  } catch (error) {
    console.log("❌ BACKEND ERROR:", error.message);

    if (error.response) {
      console.log("Python response:", error.response.data);
    }

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  analyzeResume
};