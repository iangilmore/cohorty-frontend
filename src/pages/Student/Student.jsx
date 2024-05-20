
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
    <Box sx={{ width: '100%' }}>
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
