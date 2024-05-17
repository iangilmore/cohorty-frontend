import React, { useState, useEffect } from 'react'
import { getCourses } from '../../services/courses.js';
import CourseItem from '../../components/CourseItem/CourseItem.jsx';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
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
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Courses;



