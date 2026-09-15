const pdfParse = require("pdf-parse");
const axios = require("axios");

const matchJob = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume"
      });
    }

    if (!req.body.jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Please provide a job description"
      });
    }

    // Extract resume text
    const parser = new pdfParse.PDFParse({
      data: req.file.buffer
    });

    const data = await parser.getText();

    const resumeText = data.text;
    const jobDescription = req.body.jobDescription;

    // Send data to Python AI service
    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/match-job",
      {
        resume_text: resumeText,
        job_description: jobDescription
      }
    );

    return res.status(200).json({
      success: true,
      message: "Job matched successfully",
      matchResult: aiResponse.data
    });

  } catch (error) {
    console.log("JOB MATCH ERROR:", error.message);

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
  matchJob
};