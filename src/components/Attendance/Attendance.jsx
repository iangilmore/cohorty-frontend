import { Typography, IconButton, Grid, Container } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Attendance() {
  return (
    <Container maxWidth="sm" sx={{ mt: 2, mb: 4 }}> 
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
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
    </Container>
  );
}

export default Attendance;
