import React, { useState, useEffect } from 'react';
import { getCourses } from '../../services/courses.js';
import CourseItem from '../../components/CourseItem/CourseItem.jsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();

  const handleClick = (courseId, courseName) => {
    navigate(`/${courseId}?tab=assignments`, { state: { courseName } });
  };

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Mock data for demonstration; replace with API call as needed
        const fetchedCourses = [
          { id: 1, name: 'SEB 0304' },
          { id: 2, name: 'SEB 0506' },
          { id: 3, name: 'SEB 0108' }
        ];

        // Sort courses by name (assuming name contains chronological order)
        fetchedCourses.sort((a, b) => a.name.localeCompare(b.name));

        setCourses(fetchedCourses);
      } catch (error) {
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
