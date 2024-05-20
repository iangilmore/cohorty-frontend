import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

const Course = () => {
  const location = useLocation();
  const courseName = location.state?.courseName; // Ensure location is initialized before accessing state
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get('tab');

  return (
    <div>
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography component="h1" variant="h5">
            {courseName}
          </Typography>
        {tab === 'assignments' && <div>Assignments Tab</div>}
        {/* Render other tabs or content based on the tab parameter */}
      </Box>
    </div>
  );
};

export default Course;