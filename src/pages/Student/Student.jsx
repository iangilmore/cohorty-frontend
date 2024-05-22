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
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center', // Centers children horizontally
        alignItems: 'center' // Centers children vertically
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: 800,
          bgcolor: 'white', // Set the background color to white for better readability
          p: 2, // Padding inside the box
          boxShadow: 3, // Adds a shadow for depth, can be adjusted or removed as needed
          borderRadius: '4px', // Optional: rounds the corners
          display: 'flex',
          flexDirection: 'column', // Aligns children vertically
          alignItems: 'center', // Centers children horizontally
          minHeight: '60vh', // Ensures a minimum height for the box
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
          Ian Gilmore
        </Typography>
        <Tabs value={selectedTab} onChange={handleChange} centered>
          <Tab label="Assignments" value="assignments" />
          <Tab label="Attendance" value="attendance" />
        </Tabs>
        <Box sx={{ mt: 2, width: '100%', height: '100%' }}>
          {selectedTab === 'assignments' && <AssignmentStatusGrid />}
          {selectedTab === 'attendance' && <Attendance />}
        </Box>
      </Box>
    </Box>
  );
}
