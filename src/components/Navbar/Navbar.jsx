import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';
import { useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  return (
    <Box 
      display="flex"
      justifyContent="space-between"
      alignItems="center" 
      width="100%"
    >
      <Box display="flex" alignItems="center">
        <GridOnRoundedIcon fontSize="large" />
        <Button variant="text">Current Page</Button>
      </Box>

      {location.pathname === "/:courseId/students/:studentId" && "/:courseId/students/:studentId/?tab=assignments" ( 
        <Box display="flex" gap="2"> 
          <Button variant="text">Students</Button>
          <Button variant="text">Assignments</Button>
        </Box>
      )}

      <Button variant="outlined">Logout</Button>
    </Box>
  );
}
