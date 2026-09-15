from flask import Flask, request, jsonify
import re

app = Flask(__name__)


# ==========================================
# SKILLS DATABASE
# ==========================================

SKILLS = [
    "python",
    "javascript",
    "react",
    "node.js",
    "express",
    "mongodb",
    "sql",
    "java",
    "c++",
    "html",
    "css",
    "git",
    "github",
    "docker",
    "aws",
    "machine learning",
    "data science",
    "pandas",
    "numpy",
    "scikit-learn"
]


# ==========================================
# SKILL ALIASES
# ==========================================

SKILL_ALIASES = {

    "python": [
        "python"
    ],

    "javascript": [
        "javascript",
        "java script",
        "js"
    ],

    "react": [
        "react",
        "reactjs",
        "react.js"
    ],

    "node.js": [
        "node.js",
        "nodejs",
        "node js",
        "node"
    ],

    "express": [
        "express",
        "express.js",
        "expressjs"
    ],

    "mongodb": [
        "mongodb",
        "mongo db",
        "mongo database",
        "mongo"
    ],

    "sql": [
        "sql",
        "mysql",
        "postgresql",
        "postgres"
    ],

    "java": [
        "java"
    ],

    "c++": [
        "c++",
        "cpp"
    ],

    "html": [
        "html",
        "html5"
    ],

    "css": [
        "css",
        "css3"
    ],

    "git": [
        "git"
    ],

    "github": [
        "github",
        "git hub"
    ],

    "docker": [
        "docker",
        "docker container"
    ],

    "aws": [
        "aws",
        "amazon web services"
    ],

    "machine learning": [
        "machine learning",
        "machine-learning",
        "ml"
    ],

    "data science": [
        "data science",
        "data scientist"
    ],

    "pandas": [
        "pandas"
    ],

    "numpy": [
        "numpy"
    ],

    "scikit-learn": [
        "scikit-learn",
        "scikit learn",
        "sklearn"
    ]

}


# ==========================================
# CAREER ROLE SKILLS
# ==========================================

ROLE_SKILLS = {

    "mern developer": [
        "javascript",
        "react",
        "node.js",
        "express",
        "mongodb",
        "html",
        "css",
        "git"
    ],

    "mern stack developer": [
        "javascript",
        "react",
        "node.js",
        "express",
        "mongodb",
        "html",
        "css",
        "git"
    ],

    "frontend developer": [
        "html",
        "css",
        "javascript",
        "react",
        "git"
    ],

    "backend developer": [
        "javascript",
        "node.js",
        "express",
        "mongodb",
        "sql",
        "git"
    ],

    "python developer": [
        "python",
        "sql",
        "git",
        "docker",
        "aws"
    ],

    "data scientist": [
        "python",
        "sql",
        "pandas",
        "numpy",
        "machine learning",
        "data science",
        "scikit-learn"
    ],

    "machine learning engineer": [
        "python",
        "numpy",
        "pandas",
        "machine learning",
        "scikit-learn",
        "sql",
        "docker"
    ]

}


# ==========================================
# SKILL DETECTION FUNCTION
# ==========================================

def detect_skills(text):

    text = text.lower()

    found_skills = []

    for skill in SKILLS:

        aliases = SKILL_ALIASES.get(
            skill,
            [skill]
        )

        for alias in aliases:

            pattern = r"(?<![a-zA-Z0-9])" + \
                      re.escape(alias.lower()) + \
                      r"(?![a-zA-Z0-9])"

            if re.search(pattern, text):

                found_skills.append(skill)

                break

    return found_skills


# ==========================================
# HOME
# ==========================================

@app.route("/")
def home():

    return "CareerPilot AI Service Running"


# ==========================================
# RESUME ANALYZER
# ==========================================

@app.route(
    "/analyze",
    methods=["POST"]
)
def analyze():

    data = request.get_json()

    resume_text = data.get(
        "resume_text",
        ""
    ).lower()

    if not resume_text:

        return jsonify({
            "success": False,
            "message": "Resume text is required"
        }), 400


    found_skills = detect_skills(
        resume_text
    )


    score = min(
        len(found_skills) * 5,
        100
    )


    return jsonify({

        "success": True,

        "skills": found_skills,

        "skill_count": len(found_skills),

        "resume_score": score

    })


# ==========================================
# JOB MATCHER
# ==========================================

@app.route(
    "/match-job",
    methods=["POST"]
)
def match_job():

    data = request.get_json()


    resume_text = data.get(
        "resume_text",
        ""
    ).lower()


    job_description = data.get(
        "job_description",
        ""
    ).lower()


    if not resume_text:

        return jsonify({

            "success": False,

            "message":
                "Resume text is required"

        }), 400


    if not job_description:

        return jsonify({

            "success": False,

            "message":
                "Job description is required"

        }), 400


    # Detect skills from resume

    resume_skills = detect_skills(
        resume_text
    )


    # Detect skills required by job

    job_skills = detect_skills(
        job_description
    )


    matched_skills = []

    missing_skills = []


    for skill in job_skills:

        if skill in resume_skills:

            matched_skills.append(skill)

        else:

            missing_skills.append(skill)


    total_required = len(
        job_skills
    )


    if total_required > 0:

        match_score = round(

            (
                len(matched_skills)
                /
                total_required
            ) * 100

        )

    else:

        match_score = 0


    return jsonify({

        "success": True,

        "match_score": match_score,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills,

        "resume_skills": resume_skills,

        "job_skills": job_skills,

        "total_required_skills":
            total_required

    })


# ==========================================
# SKILL GAP ANALYZER
# ==========================================

@app.route(
    "/skill-gap",
    methods=["POST"]
)
def skill_gap():

    data = request.get_json()


    resume_text = data.get(
        "resume_text",
        ""
    ).lower()


    target_role = data.get(
        "target_role",
        ""
    ).lower().strip()


    if not resume_text:

        return jsonify({

            "success": False,

            "message":
                "Resume text is required"

        }), 400


    if not target_role:

        return jsonify({

            "success": False,

            "message":
                "Target role is required"

        }), 400


    current_skills = detect_skills(
        resume_text
    )


    required_skills = []


    for role, skills in ROLE_SKILLS.items():

        if role in target_role:

            required_skills = skills

            break


    if not required_skills:

        return jsonify({

            "success": False,

            "message":
                "This career role is not available yet. "
                "Try MERN Developer, Frontend Developer, "
                "Backend Developer, Python Developer, "
                "Data Scientist or Machine Learning Engineer."

        }), 400


    missing_skills = []


    for skill in required_skills:

        if skill not in current_skills:

            missing_skills.append(skill)


    recommended_skills = missing_skills[:5]


    relevant_current_skills = 0


    for skill in required_skills:

        if skill in current_skills:

            relevant_current_skills += 1


    if len(required_skills) > 0:

        readiness_score = round(

            (
                relevant_current_skills
                /
                len(required_skills)
            ) * 100

        )

    else:

        readiness_score = 0


    return jsonify({

        "success": True,

        "target_role": target_role,

        "current_skills": current_skills,

        "required_skills": required_skills,

        "missing_skills": missing_skills,

        "recommended_skills": recommended_skills,

        "readiness_score": readiness_score

    })


# ==========================================
# AI CAREER ROADMAP
# ==========================================

@app.route(
    "/roadmap",
    methods=["POST"]
)
def roadmap():

    data = request.get_json()


    target_role = data.get(
        "target_role",
        ""
    ).lower().strip()


    if not target_role:

        return jsonify({

            "success": False,

            "message":
                "Target role is required"

        }), 400


    if "mern" in target_role:

        phases = [

            {
                "title":
                    "JavaScript Fundamentals",

                "duration":
                    "2-3 weeks",

                "skills": [
                    "JavaScript",
                    "ES6",
                    "DOM",
                    "Async JavaScript"
                ],

                "tasks": [
                    "Practice JavaScript fundamentals",
                    "Learn ES6 features",
                    "Build small JavaScript projects"
                ]
            },

            {
                "title":
                    "Frontend Development",

                "duration":
                    "3-4 weeks",

                "skills": [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React",
                    "React Router"
                ],

                "tasks": [
                    "Build responsive React pages",
                    "Learn component architecture",
                    "Build a React project"
                ]
            },

            {
                "title":
                    "Backend Development",

                "duration":
                    "3-4 weeks",

                "skills": [
                    "Node.js",
                    "Express",
                    "REST API",
                    "MongoDB"
                ],

                "tasks": [
                    "Build Express APIs",
                    "Connect MongoDB",
                    "Create authentication APIs"
                ]
            },

            {
                "title":
                    "Projects & Interviews",

                "duration":
                    "3-4 weeks",

                "skills": [
                    "Git",
                    "GitHub",
                    "DSA",
                    "System Design"
                ],

                "tasks": [
                    "Build a full-stack project",
                    "Upload projects to GitHub",
                    "Practice coding problems",
                    "Prepare for interviews"
                ]
            }

        ]


    elif "frontend" in target_role:

        phases = [

            {
                "title":
                    "Web Fundamentals",

                "duration":
                    "2 weeks",

                "skills": [
                    "HTML",
                    "CSS",
                    "JavaScript"
                ],

                "tasks": [
                    "Build responsive websites",
                    "Practice JavaScript"
                ]
            },

            {
                "title":
                    "React Development",

                "duration":
                    "3-4 weeks",

                "skills": [
                    "React",
                    "React Router",
                    "API Integration"
                ],

                "tasks": [
                    "Build React applications",
                    "Connect REST APIs"
                ]
            },

            {
                "title":
                    "Projects & Deployment",

                "duration":
                    "3 weeks",

                "skills": [
                    "Git",
                    "GitHub",
                    "Deployment"
                ],

                "tasks": [
                    "Build portfolio projects",
                    "Deploy projects"
                ]
            }

        ]


    elif "backend" in target_role:

        phases = [

            {
                "title":
                    "Programming Fundamentals",

                "duration":
                    "2-3 weeks",

                "skills": [
                    "JavaScript",
                    "Node.js"
                ],

                "tasks": [
                    "Learn backend programming",
                    "Practice Node.js"
                ]
            },

            {
                "title":
                    "API Development",

                "duration":
                    "3 weeks",

                "skills": [
                    "Express",
                    "REST API",
                    "Authentication"
                ],

                "tasks": [
                    "Build REST APIs",
                    "Implement authentication"
                ]
            },

            {
                "title":
                    "Database & Projects",

                "duration":
                    "3-4 weeks",

                "skills": [
                    "MongoDB",
                    "SQL",
                    "Git"
                ],

                "tasks": [
                    "Build database applications",
                    "Create backend projects"
                ]
            }

        ]


    else:

        return jsonify({

            "success": False,

            "message":
                "Career roadmap is currently available "
                "for MERN Developer, Frontend Developer "
                "and Backend Developer."

        }), 400


    return jsonify({

        "success": True,

        "target_role": target_role,

        "phases": phases

    })


# ==========================================
# AI MOCK INTERVIEW
# ==========================================

@app.route(
    "/interview/question",
    methods=["POST"]
)
def interview_question():

    data = request.get_json()


    target_role = data.get(
        "target_role",
        ""
    ).lower().strip()


    if not target_role:

        return jsonify({

            "success": False,

            "message":
                "Target role is required"

        }), 400


    if "mern" in target_role:

        question = (
            "What is the difference between "
            "useState and useEffect in React?"
        )


    elif "frontend" in target_role:

        question = (
            "What is the difference between "
            "Flexbox and CSS Grid?"
        )


    elif "backend" in target_role:

        question = (
            "What is middleware in Express.js "
            "and why is it used?"
        )


    elif "python" in target_role:

        question = (
            "What is the difference between "
            "a list and a tuple in Python?"
        )


    else:

        question = (
            "Tell me about yourself and explain "
            "why you are suitable for this role."
        )


    return jsonify({

        "success": True,

        "question": question

    })


# ==========================================
# AI MOCK INTERVIEW EVALUATION
# ==========================================

@app.route(
    "/interview/evaluate",
    methods=["POST"]
)
def evaluate_interview():

    data = request.get_json()


    target_role = data.get(
        "target_role",
        ""
    )


    question = data.get(
        "question",
        ""
    )


    answer = data.get(
        "answer",
        ""
    ).strip()


    if not target_role or not question or not answer:

        return jsonify({

            "success": False,

            "message":
                "Target role, question and answer are required"

        }), 400


    answer_lower = answer.lower()


    score = 0


    if len(answer.split()) >= 10:

        score += 25


    technical_keywords = [

        "because",
        "example",
        "function",
        "component",
        "state",
        "api",
        "database",
        "performance",
        "user",
        "data"

    ]


    keyword_count = 0


    for keyword in technical_keywords:

        if keyword in answer_lower:

            keyword_count += 1


    score += min(
        keyword_count * 7,
        35
    )


    if len(answer.split()) >= 30:

        score += 20


    if (
        "for example" in answer_lower
        or "because" in answer_lower
        or "which means" in answer_lower
    ):

        score += 20


    score = min(
        score,
        100
    )


    if score >= 80:

        feedback = (
            "Excellent answer. Your response is "
            "clear, detailed and technically relevant."
        )

    elif score >= 60:

        feedback = (
            "Good answer. Try adding more technical "
            "details and a practical example."
        )

    elif score >= 40:

        feedback = (
            "Fair answer. Improve your explanation "
            "with technical concepts and examples."
        )

    else:

        feedback = (
            "Your answer needs improvement. "
            "Explain the concept clearly and "
            "include a practical example."
        )


    return jsonify({

        "success": True,

        "score": score,

        "feedback": feedback,

        "strength": (
            "Good communication"
            if score >= 60
            else "Needs more technical depth"
        ),

        "improvement": (
            "Add practical examples and explain "
            "the concept step by step."
        )

    })


# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":

    app.run(
        port=8000,
        debug=True
    )