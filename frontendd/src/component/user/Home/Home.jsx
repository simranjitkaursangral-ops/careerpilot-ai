import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

  const tools = [
    {
      icon: "📄",
      title: "Resume Analyzer",
      description:
        "Analyze your resume, detect skills and get an AI-powered resume score.",
      link: "/resume-analyzer",
      number: "01"
    },
    {
      icon: "🎯",
      title: "Job Matcher",
      description:
        "Compare your resume with a job description and discover your match score.",
      link: "/job-matcher",
      number: "02"
    },
    {
      icon: "🧩",
      title: "Skill Gap",
      description:
        "Discover missing skills and understand what you need to learn for your target role.",
      link: "/skill-gap",
      number: "03"
    },
    {
      icon: "🗺️",
      title: "Career Roadmap",
      description:
        "Generate a structured learning path based on the career you want to build.",
      link: "/career-roadmap",
      number: "04"
    },
    {
      icon: "🎤",
      title: "Mock Interview",
      description:
        "Practice interview questions and receive instant AI-powered feedback.",
      link: "/mock-interview",
      number: "05"
    }
  ];


  return (

    <div className="home-page">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            ✦ AI-POWERED CAREER INTELLIGENCE
          </div>


          <h1>

            Your Career.

            <br />

            <span>
              Your Intelligence.
            </span>

            <br />

            Your Next Move.

          </h1>


          <p>

            CareerPilot AI helps you understand your
            resume, discover skill gaps, match jobs,
            build your roadmap and practice interviews
            — all in one place.

          </p>


          <div className="hero-actions">

            <Link
              to="/resume-analyzer"
              className="primary-btn"
            >
              Analyze My Resume →
            </Link>


            <Link
              to="/career-roadmap"
              className="secondary-btn"
            >
              Explore Career Roadmap
            </Link>

          </div>


          <div className="hero-trust">

            <span>✓ AI-powered insights</span>

            <span>✓ Career-focused analysis</span>

            <span>✓ Built for developers</span>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="dashboard-card">

            <div className="dashboard-top">

              <div>

                <span>
                  CAREER READINESS
                </span>

                <h3>
                  Your Career Score
                </h3>

              </div>


              <div className="score-circle">

                <strong>
                  82
                </strong>

                <span>
                  /100
                </span>

              </div>

            </div>


            <div className="progress-area">

              <div className="progress-label">

                <span>
                  Technical Skills
                </span>

                <strong>
                  86%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  style={{
                    width: "86%"
                  }}
                />

              </div>


              <div className="progress-label">

                <span>
                  Resume Strength
                </span>

                <strong>
                  78%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  style={{
                    width: "78%"
                  }}
                />

              </div>


              <div className="progress-label">

                <span>
                  Interview Readiness
                </span>

                <strong>
                  81%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  style={{
                    width: "81%"
                  }}
                />

              </div>

            </div>


            <div className="dashboard-insight">

              <span>
                ✦ AI INSIGHT
              </span>

              <p>
                You are strong in React and JavaScript.
                Focus next on system design and testing.
              </p>

            </div>

          </div>


          <div className="floating-card floating-one">

            <span>
              🎯
            </span>

            <div>

              <strong>
                87%
              </strong>

              <small>
                Job Match
              </small>

            </div>

          </div>


          <div className="floating-card floating-two">

            <span>
              🚀
            </span>

            <div>

              <strong>
                12 Skills
              </strong>

              <small>
                Career Ready
              </small>

            </div>

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="stats-section">

        <div className="stat-item">

          <strong>
            5
          </strong>

          <span>
            AI Career Tools
          </span>

        </div>


        <div className="stat-item">

          <strong>
            360°
          </strong>

          <span>
            Career Analysis
          </span>

        </div>


        <div className="stat-item">

          <strong>
            AI
          </strong>

          <span>
            Powered Insights
          </span>

        </div>


        <div className="stat-item">

          <strong>
            1
          </strong>

          <span>
            Career Platform
          </span>

        </div>

      </section>


      {/* TOOLS */}

      <section className="tools-section">

        <div className="section-heading">

          <span>
            EVERYTHING YOU NEED
          </span>

          <h2>

            One Platform.

            <br />

            <strong>
              Smarter Career Decisions.
            </strong>

          </h2>

          <p>
            From your first resume analysis to your
            next interview, CareerPilot guides your
            career journey.
          </p>

        </div>


        <div className="tools-grid">

          {tools.map((tool) => (

            <Link
              to={tool.link}
              className="tool-card"
              key={tool.number}
            >

              <div className="tool-top">

                <div className="tool-icon">
                  {tool.icon}
                </div>

                <span>
                  {tool.number}
                </span>

              </div>


              <h3>
                {tool.title}
              </h3>


              <p>
                {tool.description}
              </p>


              <div className="tool-link">
                Explore tool →
              </div>

            </Link>

          ))}

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="process-section">

        <div className="section-heading">

          <span>
            SIMPLE PROCESS
          </span>

          <h2>
            From Confused
            <br />
            <strong>To Career Ready.</strong>
          </h2>

        </div>


        <div className="process-grid">

          <div className="process-step">

            <div className="process-number">
              01
            </div>

            <h3>
              Understand
            </h3>

            <p>
              Analyze your resume and understand
              your current career position.
            </p>

          </div>


          <div className="process-line" />


          <div className="process-step">

            <div className="process-number">
              02
            </div>

            <h3>
              Discover
            </h3>

            <p>
              Find job matches and identify the
              skills you are missing.
            </p>

          </div>


          <div className="process-line" />


          <div className="process-step">

            <div className="process-number">
              03
            </div>

            <h3>
              Improve
            </h3>

            <p>
              Follow an AI-generated roadmap and
              practice with mock interviews.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="final-cta">

        <div>

          <span>
            READY TO MOVE FORWARD?
          </span>

          <h2>
            Stop Guessing.
            <br />
            Start Building Your Career.
          </h2>

          <p>
            Let CareerPilot AI show you what to do next.
          </p>

          <Link
            to="/resume-analyzer"
            className="primary-btn"
          >
            Start Your Career Analysis →
          </Link>

        </div>

      </section>

    </div>

  );

};

export default Home;