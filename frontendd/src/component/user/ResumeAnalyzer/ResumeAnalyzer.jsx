import React, { useState } from "react";
import axios from "axios";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData
      );

      if (response.data.success) {
        setResult(response.data.aiResult);
      } else {
        alert(response.data.message);
      }

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Unable to analyze resume."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-page">

      <div className="resume-header">
        <span>AI RESUME INTELLIGENCE</span>

        <h1>
          Understand Your Resume
          <br />
          <strong>Before Recruiters Do.</strong>
        </h1>

        <p>
          Upload your resume and let CareerPilot analyze
          your skills and career readiness.
        </p>
      </div>

      <div className="upload-card">

        <div className="upload-icon">📄</div>

        <h2>Upload Your Resume</h2>

        <p>PDF format recommended</p>

        <label className="upload-btn">
          Choose Resume

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </label>

        {file && (
          <div className="selected-file">
            📎 {file.name}
          </div>
        )}

        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume →"}
        </button>

      </div>

      {result && (
        <div className="ai-result">

          <h2>AI Resume Analysis</h2>

          <div className="score-box">
            <span>Resume Score</span>
            <strong>
              {result.resume_score}/100
            </strong>
          </div>

          <div className="skills-box">

            <h3>Detected Skills</h3>

            <div className="skills-list">

              {result.skills && result.skills.length > 0 ? (
                result.skills.map((skill, index) => (
                  <span key={index}>
                    {skill}
                  </span>
                ))
              ) : (
                <p>No technical skills detected.</p>
              )}

            </div>

          </div>

          <div className="skill-count">
            <strong>{result.skill_count}</strong>
            <span>Skills Detected</span>
          </div>

        </div>
      )}

    </div>
  );
};

export default ResumeAnalyzer;