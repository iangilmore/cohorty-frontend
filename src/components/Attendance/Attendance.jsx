import { Typography, IconButton, Grid, Container, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Attendance() {
  return (
    <Container maxWidth="sm" sx={{ mt: 2, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{
        bgcolor: 'white', // Set the background color to white for better readability
        width: '100%', // Takes the full width of the container
        p: 2, // Padding inside the box for spacing
        boxShadow: 3, // Adds a shadow for depth, can be adjusted or removed as needed
        borderRadius: '4px', // Optional: rounds the corners
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center content
      }}>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
          Attendance
        </Typography>
        <Grid container spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="center">
              Absences
            </Typography>
            <Grid container direction="column" alignItems="center" spacing={1}>
              <Typography>April 3</Typography>
              <IconButton color="primary" size="large">
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="center">
              Tardies
            </Typography>
            <Grid container direction="column" alignItems="center" spacing={1}>
              <Typography>April 22</Typography>
              <IconButton color="primary" size="large">
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Attendance;
