import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const Layout = () => {

  const navClass = ({ isActive }) =>
    isActive
      ? "nav-link active"
      : "nav-link";

  return (

    <div className="app-layout">

      {/* NAVBAR */}

      <header className="main-navbar">

        <div className="navbar-inner">

          <Link
            to="/"
            className="brand"
          >
            <span className="brand-icon">
              ✦
            </span>

            <span>
              Career<span>Pilot</span>
            </span>
          </Link>


          <nav className="main-nav">

            <NavLink
              to="/"
              className={navClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/resume-analyzer"
              className={navClass}
            >
              Resume
            </NavLink>

            <NavLink
              to="/job-matcher"
              className={navClass}
            >
              Job Matcher
            </NavLink>

            <NavLink
              to="/skill-gap"
              className={navClass}
            >
              Skill Gap
            </NavLink>

            <NavLink
              to="/career-roadmap"
              className={navClass}
            >
              Roadmap
            </NavLink>

            <NavLink
              to="/mock-interview"
              className={navClass}
            >
              Mock Interview
            </NavLink>

          </nav>


          <Link
            to="/resume-analyzer"
            className="navbar-cta"
          >
            Get Started →
          </Link>

        </div>

      </header>


      {/* PAGE CONTENT */}

      <main className="main-content">

        <Outlet />

      </main>


      {/* FOOTER */}

      <footer className="main-footer">

        <div className="footer-inner">

          <div className="footer-brand">

            <Link
              to="/"
              className="brand"
            >
              <span className="brand-icon">
                ✦
              </span>

              Career<span>Pilot</span>
            </Link>

            <p>
              AI-powered career intelligence
              for the next generation of developers.
            </p>

          </div>


          <div className="footer-links">

            <div>

              <h4>
                Platform
              </h4>

              <Link to="/resume-analyzer">
                Resume Analyzer
              </Link>

              <Link to="/job-matcher">
                Job Matcher
              </Link>

              <Link to="/skill-gap">
                Skill Gap
              </Link>

            </div>


            <div>

              <h4>
                Career Tools
              </h4>

              <Link to="/career-roadmap">
                Career Roadmap
              </Link>

              <Link to="/mock-interview">
                Mock Interview
              </Link>

            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} CareerPilot AI
          </span>

          <span>
            Built for smarter careers.
          </span>

        </div>

      </footer>

    </div>

  );

};

export default Layout;

