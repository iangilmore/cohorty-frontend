import { Route, Routes } from 'react-router-dom'

// Components
import Assignment from './pages/Assignment/Assignment.jsx'
import Course from './pages/Course/Course.jsx'
import Courses from './pages/Courses/Courses.jsx'
import Login from './pages/Login/Login.jsx'
import Student from './pages/Student/Student.jsx'
import NavBar from './components/NavBar/NavBar.jsx'



function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/:courseId/?tab=assignments" element={<Course />} />
        <Route path="/:courseId/students/:studentId" element={<Student />} />
        <Route path="/:courseId/students/:studentId/?tab=assignments" element={<Assignment />} />
      </Routes>
    </>
  )
}

export default App
