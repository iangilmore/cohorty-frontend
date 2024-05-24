import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CourseItem = ({ course, handleClick }) => {
  return (
    <Card 
      onClick={() => handleClick(course.id, course.name)}
      sx={{
        height: 150, // Increased height for larger boxes
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
        color: '#1a1a1a',   // Dark text color
        padding: 2,         // Added padding
      }}
    >
      <CardContent>
        <Typography variant="h4" component="div"> {/* Changed variant to h4 for larger text */}
          {course.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseItem;
