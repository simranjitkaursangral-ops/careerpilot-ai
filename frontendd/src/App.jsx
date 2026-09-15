import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/user/Layout";
import Home from "./component/user/Home/Home";
import ResumeAnalyzer from "./component/user/ResumeAnalyzer/ResumeAnalyzer";
import JobMatcher from "./component/user/JobMatcher/JobMatcher";
import SkillGap from "./component/user/SkillGap/SkillGap";
import CareerRoadmap from "./component/user/CareerRoadmap/CareerRoadmap";
import MockInterview from "./component/user/MockInterview/MockInterview";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route
          path="/resume-analyzer"
          element={<ResumeAnalyzer />}
        />
        <Route
  path="/job-matcher"
  element={<JobMatcher />}
/>
<Route
  path="/skill-gap"
  element={<SkillGap />}
/>
<Route
  path="/career-roadmap"
  element={<CareerRoadmap />}
/>
  {/* Mock Interview */}
        <Route
          path="/mock-interview"
          element={<MockInterview />}
        />
      </Route>
    </Routes>
  );
};

export default App;
