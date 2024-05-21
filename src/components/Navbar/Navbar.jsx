import { useState } from 'react';
import { Button, Box } from '@mui/material';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavBar({ onTabChange, courseName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTabState, setActiveTabState] = useState(location.pathname.includes('assignments') ? 'assignments' : 'students');

  const handleTabChange = (tab) => {
    setActiveTabState(tab);
    onTabChange(tab);
    navigate(`/${tab}`);
  };

  const handleCourseClick = () => {
    navigate('/courses');
  };

  return (
    <Box 
      display="flex"
      justifyContent="space-between"
      alignItems="center" 
      width="100%"
      p={1}
      boxSizing='border-box'
      boxShadow={3}
      bgcolor="background.paper"
    >
      <Box display="flex" alignItems="center">
        <GridOnRoundedIcon fontSize="large" />
        <Button variant="text" sx={{ fontWeight: 'bold' }} onClick={handleCourseClick}>
          {courseName}
        </Button>
      </Box>

      <Box display="flex" gap={2}> 
        <Button 
          variant="text" 
          sx={{ fontWeight: activeTabState === 'students' ? 'bold' : 'normal' }}
          onClick={() => handleTabChange('students')}
        >
          Students
        </Button>
        <Button 
          variant="text" 
          sx={{ fontWeight: activeTabState === 'assignments' ? 'bold' : 'normal' }}
          onClick={() => handleTabChange('assignments')}
        >
          Assignments
        </Button>
      </Box>

      <Button variant="outlined">Log Out</Button>
    </Box>
  );
}
