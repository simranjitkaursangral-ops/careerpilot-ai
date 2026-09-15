import React, { useState } from "react";
import axios from "axios";

const MockInterview = () => {

  const [targetRole, setTargetRole] = useState("");

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [evaluation, setEvaluation] = useState(null);

  const [loadingQuestion, setLoadingQuestion] =
    useState(false);

  const [loadingEvaluation, setLoadingEvaluation] =
    useState(false);


  // ==========================================
  // GENERATE QUESTION
  // ==========================================

  const handleStartInterview = async () => {

    if (!targetRole.trim()) {

      alert("Please enter your target role.");

      return;

    }


    try {

      setLoadingQuestion(true);

      setQuestion("");

      setAnswer("");

      setEvaluation(null);


      const response = await axios.post(
        "http://localhost:5000/api/interview/question",
        {
          targetRole: targetRole.trim()
        }
      );


      console.log(
        "QUESTION RESPONSE:",
        response.data
      );


      if (response.data.success) {

        setQuestion(
          response.data.question
        );

      } else {

        alert(
          response.data.message ||
          "Unable to generate question."
        );

      }

    } catch (error) {

      console.log(
        "QUESTION ERROR:",
        error
      );

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );


      alert(
        error.response?.data?.message ||
        "Unable to generate interview question."
      );

    } finally {

      setLoadingQuestion(false);

    }

  };


  // ==========================================
  // EVALUATE ANSWER
  // ==========================================

  const handleSubmitAnswer = async () => {

    if (!answer.trim()) {

      alert("Please enter your answer.");

      return;

    }


    try {

      setLoadingEvaluation(true);


      const response = await axios.post(
        "http://localhost:5000/api/interview/evaluate",
        {
          targetRole: targetRole,
          question: question,
          answer: answer
        }
      );


      console.log(
        "EVALUATION RESPONSE:",
        response.data
      );


      if (response.data.success) {

        setEvaluation(
          response.data.evaluation
        );

      } else {

        alert(
          response.data.message ||
          "Unable to evaluate answer."
        );

      }

    } catch (error) {

      console.log(
        "EVALUATION ERROR:",
        error
      );

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );


      alert(
        error.response?.data?.message ||
        "Unable to evaluate answer."
      );

    } finally {

      setLoadingEvaluation(false);

    }

  };


  // ==========================================
  // NEXT QUESTION
  // ==========================================

  const handleNextQuestion = () => {

    setQuestion("");

    setAnswer("");

    setEvaluation(null);

    handleStartInterview();

  };


  return (

    <div className="mock-interview-page">


      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="resume-header">

        <span>
          AI MOCK INTERVIEW
        </span>


        <h1>

          Practice Like It's

          <br />

          <strong>
            Your Real Interview.
          </strong>

        </h1>


        <p>

          Choose your target role, answer AI-generated
          interview questions and receive instant feedback.

        </p>

      </div>



      {/* ==========================================
          ROLE INPUT
      ========================================== */}

      <div className="matcher-card">

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

            }}

          />

        </div>


        <button

          className="analyze-btn"

          onClick={handleStartInterview}

          disabled={loadingQuestion}

        >

          {loadingQuestion
            ? "Generating..."
            : "Start Interview →"}

        </button>

      </div>



      {/* ==========================================
          QUESTION
      ========================================== */}

      {question && (

        <div className="ai-result">


          <div className="skills-box">

            <span>
              INTERVIEW QUESTION
            </span>


            <h2>
              {question}
            </h2>

          </div>



          {/* ANSWER */}

          <div className="matcher-section">

            <h2>
              Your Answer
            </h2>


            <textarea

              placeholder="Type your interview answer here..."

              value={answer}

              onChange={(e) =>
                setAnswer(e.target.value)
              }

              rows="7"

            />

          </div>


          <button

            className="analyze-btn"

            onClick={handleSubmitAnswer}

            disabled={loadingEvaluation}

          >

            {loadingEvaluation
              ? "Evaluating..."
              : "Submit Answer →"}

          </button>


        </div>

      )}



      {/* ==========================================
          EVALUATION
      ========================================== */}

      {evaluation && (

        <div className="ai-result">


          <h2>
            AI Interview Feedback
          </h2>


          {/* SCORE */}

          <div className="score-box">

            <span>
              Interview Score
            </span>


            <strong>
              {evaluation.score}/100
            </strong>

          </div>


          {/* FEEDBACK */}

          <div className="skills-box">

            <h3>
              AI Feedback
            </h3>


            <p>
              {evaluation.feedback}
            </p>

          </div>


          {/* STRENGTH */}

          <div className="skills-box">

            <h3>
              Strength
            </h3>


            <p>
              {evaluation.strength}
            </p>

          </div>


          {/* IMPROVEMENT */}

          <div className="skills-box">

            <h3>
              How to Improve
            </h3>


            <p>
              {evaluation.improvement}
            </p>

          </div>


          {/* NEXT QUESTION */}

          <button

            className="analyze-btn"

            onClick={handleNextQuestion}

            disabled={loadingQuestion}

          >

            {loadingQuestion
              ? "Generating..."
              : "Next Question →"}

          </button>

        </div>

      )}

    </div>

  );

};


export default MockInterview;