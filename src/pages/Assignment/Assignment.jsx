import SingleAssignmentGrid from "../../components/SingleAssignmentGrid/SingleAssignmentGrid"
import { Box } from "@mui/material"

export default function Assignment() {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 60px)', // Adjust height to account for Navbar
        marginTop: '60px', // Margin to avoid overlap with fixed Navbar
        backgroundImage: 'url(https://images.pexels.com/photos/5324991/pexels-photo-5324991.jpeg)', // Direct image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SingleAssignmentGrid />
    </Box>
  );
}
