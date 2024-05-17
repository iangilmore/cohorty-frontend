import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const CourseItem = ({ course }) => {
  return (
    <Card>
      <CardContent>
        <h2>{course.name}</h2>
      </CardContent>
    </Card>
  );
};

export default CourseItem;
