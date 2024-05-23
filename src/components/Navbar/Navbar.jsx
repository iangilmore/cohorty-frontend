import { useState, useContext } from 'react';
import { Button, Box, IconButton, Typography } from '@mui/material';
import Logo from '../../assets/cohortySymbol.png';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../context/AuthContextComponent';
import { logOut } from '../../services/users';

export default function Navbar({ onTabChange, courseName, courseId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useContext(AuthContext); // Use AuthContext to manage auth state
  const [activeTabState, setActiveTabState] = useState(location.pathname.includes('assignments') ? 'assignments' : 'students');

  const handleTabChange = (tab) => {
    setActiveTabState(tab);
    onTabChange(tab);
    navigate(`/courses/${courseId}/${tab}`);
  };

  const handleCourseClick = () => {
    navigate('/courses');
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setIsUserLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
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
      position="relative"
    >
      <Box display="flex" alignItems="center">
        <Button onClick={handleCourseClick} sx={{ padding: 0, minWidth: 0 }}>
          <img src={Logo} alt="Logo" style={{ width: '50px', height: 'auto' }} />
        </Button>
      </Box>

      <Box position="absolute" left="60px">
        <Typography 
          variant="h6"
          sx={{ 
            fontWeight: 'bold',
            color: 'red',  // Change the color to red
          }}
        >
          {courseName}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" flexGrow={1}>
        {showTabs && (
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
        )}
      </Box>

      <Box>
        <IconButton onClick={handleLogout} sx={{ color: 'red' }}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
