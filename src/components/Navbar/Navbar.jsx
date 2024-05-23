import { useState } from 'react';
import { Button, Box, IconButton } from '@mui/material';
import Symbol from "../../assets/cohortyLogo.png";
import Logo from '../../assets/cohortySymbol.png'
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar({ onTabChange, courseName, courseId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTabState, setActiveTabState] = useState(location.pathname.includes('assignments') ? 'assignments' : 'students');

  const handleTabChange = (tab) => {
    setActiveTabState(tab);
    onTabChange(tab);
    navigate(`/courses/${courseId}/${tab}`);
  };

  const handleCourseClick = () => {
    navigate('/courses');
  };

  const handleLogout = () => {
    // Add your logout logic here
  };

  const showTabs = location.pathname !== '/courses';

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
        <Button onClick={handleCourseClick} sx={{ padding: 0, minWidth: 0 }}>
          <img src={Logo} alt="Logo" style={{ width: '50px', height: 'auto' }} />
        </Button>
        <Button variant="text" disabled sx={{ fontWeight: 'bold' , cursor: 'pointer'}}>
          {courseName}
        </Button>
      </Box>

      {showTabs && (
        <Box display="flex" gap={2} justifyContent="center" flexGrow={1}> 
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
      )}

      <Box>
        <IconButton onClick={handleLogout} sx={{ color: 'red' }}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
