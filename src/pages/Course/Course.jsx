import { useParams, useLocation } from 'react-router-dom';
import { Typography, Box, Paper } from '@mui/material';
import StudentTable from '../../components/StudentsOverviewGrid/StudentsOverviewGrid.jsx';
import AssignmentsGrid from '../../components/AssignmentsGrid/AssignmentsGrid.jsx';

const CustomTabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Course = ({ activeTab }) => {
  const { courseId } = useParams();
  const location = useLocation();
  const courseName = location.state?.courseName;

  const tabValue = activeTab === 'assignments' ? 0 : 1;

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 60px)', // Adjust height to account for Navbar
        marginTop: '60px', // Margin to avoid overlap with fixed Navbar
        backgroundImage: 'url(https://images.pexels.com/photos/7092515/pexels-photo-7092515.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper elevation={3} sx={{
        width: '100%', // Full width to accommodate space
        maxWidth: 800, // Keeps the content width controlled
        bgcolor: 'background.paper',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
          {courseName}
        </Typography>
        <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          {/* <Tabs value={tabValue} centered>
            <Tab label="Assignments" />
            <Tab label="Students" />
          </Tabs> */}
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <AssignmentsGrid courseId={courseId} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <StudentTable />
        </CustomTabPanel>
      </Paper>
    </Box>
  );
};

export default Course;
