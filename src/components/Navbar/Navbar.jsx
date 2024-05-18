import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';

export default function NavBar() {
  return (
    <>
      <Box 
        display="flex"
        justifyContent="space-between"
        alignItems="center" 
        width="100%"        
      >
        <Box display="flex" alignItems="center">
          <GridOnRoundedIcon  
            fontSize="large"
          />
          <Button variant="text">Current Page</Button>
        </Box>
        <Button variant="outlined">Logout</Button>
      </Box>
    </>
  );
}
