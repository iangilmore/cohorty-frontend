import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import AssignmentStatusGrid from "../../components/AssignmentStatusGrid/AssignmentStatusGrid";
import Attendance from "../../components/Attendance/Attendance";
import { Tabs, Tab, Box, Typography } from '@mui/material';

export default function Student() {
  const [selectedTab, setSelectedTab] = useState('assignments');
  const location = useLocation();
  const studentName = location.state?.studentName

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh', // This will make sure the background covers the full view height
        backgroundImage: 'url(https://images.pexels.com/photos/7438102/pexels-photo-7438102.jpeg)', // Direct image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          // width: '90%',
          maxWidth: 800,
          bgcolor: 'white',
          p: 4,
          boxShadow: 3,
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '450px',
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
          {studentName}
        </Typography>
        <Tabs value={selectedTab} onChange={handleChange} centered>
          <Tab label="Assignments" value="assignments" />
          <Tab label="Attendance" value="attendance" />
        </Tabs>
        {/* <Box sx={{ mt: 2, width: '100%', height: '100%' }}> */}
        <Box sx={{ mt: 2, minWidth: '500px', minHeight: "500px"}}>
          {selectedTab === 'assignments' && <AssignmentStatusGrid />}
          {selectedTab === 'attendance' && <Attendance />}
        </Box>
      </Box>
    </Box>
  );
}
