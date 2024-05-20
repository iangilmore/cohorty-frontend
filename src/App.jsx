import { Route, Routes } from 'react-router-dom'

// Components
import Assignment from './pages/Assignment/Assignment.jsx'
import Course from './pages/Course/Course.jsx'
import Courses from './pages/Courses/Courses.jsx'
import Login from './pages/Login/Login.jsx'
import Student from './pages/Student/Student.jsx'
import Navbar from './components/Navbar/Navbar.jsx'



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/:courseId" element={<Course />} />
        <Route path="/:courseId/students/:studentId" element={<Student />} />
        <Route path="/:courseId/students/:studentId/assignments" element={<Assignment />} />
      </Routes>
    </>
  )
}

export default App
