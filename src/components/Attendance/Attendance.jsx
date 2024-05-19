import React from 'react';
import { Typography, Tabs, Tab, IconButton, Grid, Container } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Attendance() {
  const [value, setValue] = React.useState('attendance');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Ian Gilmore
      </Typography>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary" indicatorColor="secondary" centered>
        <Tab label="Assignments" value="assignments" />
        <Tab label="Attendance" value="attendance" />
      </Tabs>

      {value === 'attendance' && (
        <Grid container spacing={2} sx={{ width: '100%', mt: 4, justifyContent: 'center' }}>
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
      )}
    </Container>
  );
}

export default Attendance;
