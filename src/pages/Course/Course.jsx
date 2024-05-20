import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Box, Tabs, Tab } from '@mui/material';
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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Course = () => {
  const location = useLocation();
  const courseName = location.state?.courseName;
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get('tab');

  const [value, setValue] = useState(tab === 'assignments' ? 0 : 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
    sx={{
      width: '100%',
      height: '100vh', // This will make sure the background covers the full view height
      backgroundImage: 'url(https://images.pexels.com/photos/7092515/pexels-photo-7092515.jpeg)', // Update with your direct image URL
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
    <div>
      <Box sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography component="h1" variant="h5">
          {courseName}
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Assignments" {...a11yProps(0)} />
            <Tab label="Students" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AssignmentsGrid />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <StudentTable />
        </CustomTabPanel>
      </Box>
    </div>
    </Box>
  );
};

export default Course;
