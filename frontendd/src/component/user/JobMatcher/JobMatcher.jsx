import React, { useState } from "react";
import axios from "axios";

const JobMatcher = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleMatch = async () => {
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/job/match",
        formData
      );

      if (response.data.success) {
        setResult(response.data.matchResult);
      } else {
        alert(response.data.message);
      }

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Unable to match job."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-matcher-page">

      <div className="resume-header">
        <span>AI JOB MATCHER</span>

        <h1>
          Find Out How Well
          <br />
          <strong>You Match the Job.</strong>
        </h1>

        <p>
          Upload your resume and paste a job description
          to discover your compatibility.
        </p>
      </div>

      <div className="matcher-card">

        <div className="matcher-section">

          <h2>Upload Resume</h2>

          <label className="upload-btn">
            Choose Resume

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </label>

          {resume && (
            <p className="selected-file">
              📎 {resume.name}
            </p>
          )}

        </div>

        <div className="matcher-section">

          <h2>Job Description</h2>

          <textarea
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

        </div>

        <button
          className="analyze-btn"
          onClick={handleMatch}
          disabled={loading}
        >
          {loading ? "Matching..." : "Analyze Job Match →"}
        </button>

      </div>

      {result && (
        <div className="ai-result">

          <h2>AI Job Match Result</h2>

          <div className="score-box">
            <span>Match Score</span>

            <strong>
              {result.match_score}%
            </strong>
          </div>

          <div className="skills-box">

            <h3>Matched Skills</h3>

            <div className="skills-list">

              {result.matched_skills?.map(
                (skill, index) => (
                  <span key={index}>
                    {skill}
                  </span>
                )
              )}

            </div>

          </div>

          <div className="skills-box">

            <h3>Missing Skills</h3>

            <div className="skills-list">

              {result.missing_skills?.map(
                (skill, index) => (
                  <span key={index}>
                    {skill}
                  </span>
                )
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default JobMatcher;