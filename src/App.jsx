import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
// Components
import Assignment from './pages/Assignment/Assignment.jsx';
import Course from './pages/Course/Course.jsx';
import Courses from './pages/Courses/Courses.jsx';
import Login from './pages/Login/Login.jsx';
import Student from './pages/Student/Student.jsx';
import Navbar from './components/Navbar/Navbar.jsx'

function App() {
  const [activeTab, setActiveTab] = useState('students');
  const location = useLocation();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Extract course name from the route state, if available
  const courseName = location.state?.courseName || ''; // Default course name

  // Determine if the current route is the login page
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {!isLoginPage && (
        <Navbar activeTab={activeTab} onTabChange={handleTabChange} courseName={courseName} />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/students" element={<Course activeTab="students" />} />
        <Route path="/assignments" element={<Course activeTab="assignments" />} />
        <Route path="/:courseId" element={<Course activeTab={activeTab} />} />
        <Route path="/:courseId/students/:studentId" element={<Student />} />
        <Route path="/:courseId/assignments/:assignmentId" element={<Assignment />} />
      </Routes>
    </>
  );
}

export default App;
