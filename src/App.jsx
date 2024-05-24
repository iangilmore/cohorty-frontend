import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContextComponent.jsx';

// Components
import Assignment from './pages/Assignment/Assignment.jsx';
import Course from './pages/Course/Course.jsx';
import Courses from './pages/Courses/Courses.jsx';
import Login from './pages/Login/Login.jsx';
import Student from './pages/Student/Student.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'

// context
function App() {
  const { isUserLoggedIn } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('assignments');
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState('');
  const location = useLocation();

  // Determine if the current route is the login page
  const isLoginPage = location.pathname === '/';

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    if (pathSegments.includes('students')) {
      setActiveTab('students');
    } else if (pathSegments.includes('assignments')) {
      setActiveTab('assignments');
    }
  }, [location.pathname]);

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
        <Route path="/courses" element={
          <PrivateRoute>
            <Courses setCourseId={setCourseId} setCourseName={setCourseName} />
          </PrivateRoute>
        } />
        <Route path="courses/:courseId/students" element={
          <PrivateRoute>
            <Course activeTab="students" />
          </PrivateRoute>
        } />
        <Route path="courses/:courseId/assignments" element={
          <PrivateRoute>
            <Course activeTab="assignments" />
          </PrivateRoute>
        } />
        <Route path="courses/:courseId/students/:studentId" element={
          <PrivateRoute>
            <Student />
          </PrivateRoute>
        } />
        <Route path="courses/:courseId/assignments/:assignmentId" element={
          <PrivateRoute>
            <Assignment />
          </PrivateRoute>
        } />
      </Routes>
      {!isUserLoggedIn && 
        <div>Welcome to this App</div>
      }
    </>
  );
}

export default App;
