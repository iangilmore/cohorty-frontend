import React from 'react'
import { useParams, useLocation } from 'react-router-dom';

const Course = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get('tab');

  return (
    <div>
      <h1>Course ID: {courseId}</h1>
      {tab === 'assignments' && <div>Assignments Tab</div>}
      {/* Render other tabs or content based on the tab parameter */}
    </div>
  );
};

export default Course;