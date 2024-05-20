import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
      cursor: 'pointer'}}>
      <CardContent>
        <h2>{course.name}</h2>
      </CardContent>
    </Card>
  );
};

export default CourseItem;
