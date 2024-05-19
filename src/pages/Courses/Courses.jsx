import React, { useState, useEffect } from 'react'
import { getCourses } from '../../services/courses.js';
import CourseItem from '../../components/CourseItem/CourseItem.jsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: bring back after api working
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const data = await getCourses();
  //       setCourses(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

// TODO: get rid after api working
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCourses([{ id: 1, name: 'SEB 0304' },
        { id: 2, name: 'SEB 0506' },
        { id: 3, name: 'SEB 0708' }
      ]);
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
    <div className="course-page">
      <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <Typography component="h1" variant="h5">
          My Courses
        </Typography>
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </Box>
    </div>
  );
};

export default Courses;



