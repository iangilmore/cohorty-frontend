import { useState, useEffect } from 'react';
import { getCourses } from '../../services/courses.js';
import CourseItem from '../../components/CourseItem/CourseItem.jsx';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const Courses = ({ setCourseId, setCourseName }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = (courseId, courseName) => {
    setCourseId(courseId);
    setCourseName(courseName);
    navigate(`/courses/${courseId}/assignments`, { state: { courseName } });
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourses(); 

        // Sort courses by name (assuming name contains chronological order)
        fetchedCourses.sort((a, b) => a.name.localeCompare(b.name));

        setCourses(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh', // This will make sure the background covers the full view height
        backgroundImage: 'url(https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg)', // Update with your direct image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column', // Aligns children vertically
        alignItems: 'center' // Centers children horizontally
      }}
    >
      <div className="course-page">
        <Box
          sx={{
            marginTop: 2, // Reduced from 8 to 2 to bring the content closer to the top
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {courses.map((course) => (
            <CourseItem key={course.id} course={course} handleClick={handleClick}/>
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default Courses;
