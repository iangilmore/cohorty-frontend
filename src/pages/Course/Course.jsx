import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Box, Tabs, Tab, Paper, Button } from '@mui/material';
import StudentTable from '../../components/StudentsOverviewGrid/StudentsOverviewGrid.jsx';
import AssignmentsGrid from '../../components/AssignmentsGrid/AssignmentsGrid.jsx';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const CustomTabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Course = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const courseName = location.state?.courseName;
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get('tab');

  const [value, setValue] = useState(tab === 'assignments' ? 0 : 1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: 'url(https://images.pexels.com/photos/7092515/pexels-photo-7092515.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper elevation={3} sx={{
        width: '100%', // Full width to accommodate space
        maxWidth: 800, // Keeps the content width controlled
        bgcolor: 'background.paper',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
          {courseName}
        </Typography>
        <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Assignments" {...a11yProps(0)} />
            <Tab label="Students" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2, alignSelf: 'center' }} // Positioned to align centrally below the tabs
        >
          Add Assignment
        </Button>
        <CustomTabPanel value={value} index={0}>
          <AssignmentsGrid courseId={courseId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <StudentTable />
        </CustomTabPanel>
      </Paper>
    </Box>
  );
};

export default Course;
