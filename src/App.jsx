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
  const [activeTab, setActiveTab] = useState('assignments');
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState('');
  const location = useLocation();
  // Extract course name from the route state, if available
  // const courseName = location.state?.courseName || ''; // Default course name
  // Determine if the current route is the login page
  const isLoginPage = location.pathname === '/';

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  return (
    <>
      {!isLoginPage && (
        <Navbar activeTab={activeTab} onTabChange={handleTabChange} courseName={courseName} courseId={courseId}/>
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/courses" element={<Courses setCourseId={setCourseId} setCourseName={setCourseName}/>} />
        <Route path="courses/:courseId/students" element={<Course activeTab="students" />} />
        <Route path="courses/:courseId/assignments" element={<Course activeTab="assignments" />} />
        {/* <Route path="/:courseId" element={<Course activeTab={activeTab} />} /> */}
        <Route path="/:courseId/students/:studentId" element={<Student />} />
        <Route path="/:courseId/assignments/:assignmentId" element={<Assignment />} />
      </Routes>
    </>
  );
}

export default App;
