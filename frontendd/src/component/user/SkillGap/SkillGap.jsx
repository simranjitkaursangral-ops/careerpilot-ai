import React, { useState } from "react";
import axios from "axios";

const SkillGap = () => {

  const [resume, setResume] = useState(null);

  const [targetRole, setTargetRole] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);


  // ==========================================
  // FILE CHANGE
  // ==========================================

  const handleFileChange = (e) => {

    const selectedFile = e.target.files[0];

    console.log(
      "SELECTED FILE:",
      selectedFile
    );

    setResume(selectedFile);

    setResult(null);

  };


  // ==========================================
  // ANALYZE
  // ==========================================

  const handleAnalyze = async () => {

    if (!resume) {

      alert("Please upload your resume.");

      return;

    }


    if (!targetRole.trim()) {

      alert("Please enter your target role.");

      return;

    }


    const formData = new FormData();

    formData.append(
      "resume",
      resume
    );

    formData.append(
      "targetRole",
      targetRole.trim()
    );


    console.log(
      "=============================="
    );

    console.log(
      "SENDING SKILL GAP REQUEST"
    );

    console.log(
      "Resume:",
      resume.name
    );

    console.log(
      "Target Role:",
      targetRole
    );


    // Check FormData

    for (const [key, value] of formData.entries()) {

      console.log(
        "FORM DATA:",
        key,
        value
      );

    }


    try {

      setLoading(true);

      setResult(null);


      const response = await axios.post(

        "http://localhost:5000/api/skill-gap/analyze",

        formData

      );


      console.log(
        "STATUS:",
        response.status
      );

      console.log(
        "SERVER RESPONSE:",
        response.data
      );


      if (response.data.success) {

        setResult(
          response.data.gapResult
        );

      } else {

        alert(
          response.data.message ||
          "Unable to analyze skill gap."
        );

      }

    } catch (error) {

      console.log(
        "=============================="
      );

      console.log(
        "SKILL GAP ERROR"
      );

      console.log(
        "STATUS:",
        error.response?.status
      );

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      console.log(
        "ERROR:",
        error.message
      );


      alert(

        error.response?.data?.message ||

        "Unable to analyze skill gap."

      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="skill-gap-page">


      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="resume-header">

        <span>
          AI SKILL GAP ANALYZER
        </span>


        <h1>

          Discover What

          <br />

          <strong>
            You Need to Learn.
          </strong>

        </h1>


        <p>

          Upload your resume and choose your target
          role to discover the skills you need for
          your career.

        </p>

      </div>



      {/* ==========================================
          INPUT CARD
      ========================================== */}

      <div className="matcher-card">


        {/* RESUME */}

        <div className="matcher-section">

          <h2>
            Upload Resume
          </h2>


          <label className="upload-btn">

            Choose Resume


            <input

              type="file"

              accept=".pdf"

              onChange={handleFileChange}

            />

          </label>


          {resume && (

            <p className="selected-file">

              📎 {resume.name}

            </p>

          )}

        </div>



        {/* TARGET ROLE */}

        <div className="matcher-section">

          <h2>
            Target Career
          </h2>


          <input

            type="text"

            placeholder="Example: MERN Developer"

            value={targetRole}

            onChange={(e) => {

              setTargetRole(
                e.target.value
              );

              setResult(null);

            }}

          />

        </div>



        {/* BUTTON */}

        <button

          className="analyze-btn"

          onClick={handleAnalyze}

          disabled={loading}

        >

          {loading
            ? "Analyzing..."
            : "Analyze Skill Gap →"}

        </button>

      </div>



      {/* ==========================================
          RESULT
      ========================================== */}

      {result && (

        <div className="ai-result">


          <h2>
            Your Skill Gap
          </h2>


          {/* READINESS */}

          <div className="score-box">

            <span>
              Career Readiness
            </span>


            <strong>

              {result.readiness_score}%

            </strong>

          </div>



          {/* CURRENT SKILLS */}

          <div className="skills-box">

            <h3>
              Your Current Skills
            </h3>


            <div className="skills-list">

              {result.current_skills?.map(

                (skill, index) => (

                  <span key={index}>
                    {skill}
                  </span>

                )

              )}

            </div>

          </div>



          {/* REQUIRED SKILLS */}

          <div className="skills-box">

            <h3>
              Required Skills
            </h3>


            <div className="skills-list">

              {result.required_skills?.map(

                (skill, index) => (

                  <span key={index}>
                    {skill}
                  </span>

                )

              )}

            </div>

          </div>



          {/* MISSING SKILLS */}

          <div className="skills-box">

            <h3>
              Skills You Need
            </h3>


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



          {/* RECOMMENDED */}

          <div className="skills-box">

            <h3>
              Recommended Learning
            </h3>


            <div className="skills-list">

              {result.recommended_skills?.map(

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


export default SkillGap;