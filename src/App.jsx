import { Route, Routes } from 'react-router-dom'

// Components
import Assignment from './pages/Assignment/Assignment.jsx'
import Course from './pages/Course/Course.jsx'
import Courses from './pages/Courses/Courses.jsx'
import Login from './pages/Login/Login.jsx'
import Student from './pages/Student/Student.jsx'


// TODO: update routes
function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/student/:id" element={<Student />} />
        <Route path="/assignment/:id" element={<Assignment />} /> */}
      </Routes>
    </>
  )
}

export default App
