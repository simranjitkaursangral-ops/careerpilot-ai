const { PDFParse } = require("pdf-parse");
const axios = require("axios");

const analyzeSkillGap = async (req, res) => {
  try {

    console.log("\n==============================");
    console.log("SKILL GAP REQUEST");
    console.log("==============================");

    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    // Check resume
    if (!req.file) {

      console.log("❌ Resume file is missing");

      return res.status(400).json({
        success: false,
        message: "Please upload a resume"
      });

    }

    // Check target role
    if (!req.body.targetRole) {

      console.log("❌ Target role is missing");

      return res.status(400).json({
        success: false,
        message: "Please provide your target role"
      });

    }

    console.log("✅ Resume received:", req.file.originalname);
    console.log("✅ Target role:", req.body.targetRole);


    // ==============================
    // PDF PARSING
    // ==============================

    const parser = new PDFParse({
      data: req.file.buffer
    });

    const data = await parser.getText();

    const resumeText = data.text;

    console.log(
      "✅ Resume text extracted:",
      resumeText.length,
      "characters"
    );


    // ==============================
    // SEND TO PYTHON AI SERVICE
    // ==============================

    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/skill-gap",
      {
        resume_text: resumeText,
        target_role: req.body.targetRole
      }
    );


    console.log("✅ Python AI response received");

    console.log(
      "AI RESULT:",
      aiResponse.data
    );


    // ==============================
    // SEND RESULT TO REACT
    // ==============================

    return res.status(200).json({

      success: true,

      message: "Skill gap analyzed successfully",

      gapResult: aiResponse.data

    });

  } catch (error) {

    console.log("\n❌ SKILL GAP ERROR:");
    console.log(error.message);

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

      message: error.response?.data?.message ||
               error.message

    });

  }
};

module.exports = {
  analyzeSkillGap
};