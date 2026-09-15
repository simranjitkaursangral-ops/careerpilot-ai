import React, { useState } from "react";
import axios from "axios";

const CareerRoadmap = () => {

  const [targetRole, setTargetRole] = useState("");

  const [loading, setLoading] = useState(false);

  const [roadmap, setRoadmap] = useState(null);


  const handleGenerate = async () => {

    if (!targetRole.trim()) {

      alert("Please enter your target career.");

      return;

    }


    try {

      setLoading(true);

      setRoadmap(null);


      const response = await axios.post(
        "http://localhost:5000/api/roadmap/generate",
        {
          targetRole: targetRole.trim()
        }
      );


      console.log(
        "ROADMAP RESPONSE:",
        response.data
      );


      if (response.data.success) {

        setRoadmap(
          response.data.roadmap
        );

      } else {

        alert(
          response.data.message ||
          "Unable to generate roadmap."
        );

      }

    } catch (error) {

      console.log(
        "ROADMAP ERROR:",
        error
      );

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );


      alert(
        error.response?.data?.message ||
        "Unable to generate career roadmap."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="roadmap-page">


      {/* HEADER */}

      <div className="resume-header">

        <span>
          AI CAREER ROADMAP
        </span>


        <h1>

          Build Your

          <br />

          <strong>
            Career Roadmap.
          </strong>

        </h1>


        <p>

          Tell CareerPilot your target role and
          generate a structured learning roadmap
          for your career.

        </p>

      </div>



      {/* INPUT */}

      <div className="matcher-card">

        <div className="matcher-section">

          <h2>
            Target Career
          </h2>


          <input

            type="text"

            placeholder="Example: MERN Developer"

            value={targetRole}

            onChange={(e) =>
              setTargetRole(e.target.value)
            }

          />

        </div>


        <button

          className="analyze-btn"

          onClick={handleGenerate}

          disabled={loading}

        >

          {loading
            ? "Generating..."
            : "Generate Roadmap →"}

        </button>

      </div>



      {/* ROADMAP */}

      {roadmap && (

        <div className="ai-result">

          <h2>
            Your Career Roadmap
          </h2>


          {roadmap.phases?.map(
            (phase, index) => (

              <div
                className="skills-box"
                key={index}
              >

                <h3>

                  Phase {index + 1}:{" "}
                  {phase.title}

                </h3>


                <p>
                  {phase.duration}
                </p>


                <div className="skills-list">

                  {phase.skills?.map(
                    (skill, skillIndex) => (

                      <span
                        key={skillIndex}
                      >
                        {skill}
                      </span>

                    )
                  )}

                </div>


                {phase.tasks && (

                  <div>

                    <h4>
                      Tasks
                    </h4>


                    <ul>

                      {phase.tasks.map(
                        (task, taskIndex) => (

                          <li
                            key={taskIndex}
                          >
                            {task}
                          </li>

                        )
                      )}

                    </ul>

                  </div>

                )}

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

};

export default CareerRoadmap;