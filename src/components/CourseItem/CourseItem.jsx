import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CourseItem = ({ course, handleClick }) => {
  return (
    <Card 
      onClick={() => handleClick(course.id, course.name)}
      sx={{
        height: 100,
        minWidth: 275,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 2,
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        bgcolor: '#d4e8fc', // Light blue background color
        color: '#1a1a1a'    // Dark text color
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {course.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseItem;
