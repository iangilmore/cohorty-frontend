import { useState } from 'react';
import AssignmentStatusGrid from "../../components/AssignmentStatusGrid/AssignmentStatusGrid";
import Attendance from "../../components/Attendance/Attendance";
import { Tabs, Tab, Box, Typography } from '@mui/material';

export default function Student() {
  const [selectedTab, setSelectedTab] = useState('assignments');

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
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Typography variant="h4" sx={{ my: 2, textAlign: 'center' }}>
        Ian Gilmore
      </Typography>
      <Tabs value={selectedTab} onChange={handleChange} centered>
        <Tab label="Assignments" value="assignments" />
        <Tab label="Attendance" value="attendance" />
      </Tabs>
      {selectedTab === 'assignments' && <AssignmentStatusGrid />}
      {selectedTab === 'attendance' && <Attendance />}
    </Box>
  );
}
