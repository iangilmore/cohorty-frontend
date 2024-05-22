import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCourse } from '../../services/courses.js'

export default function StudentTable({ courseId }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        //TODO: uncomment out the below
        // const data = await getCourse(courseId);
        // const formattedStudents = data.students.map(student => ({
        //   id: student.id,
        //   name: student.name,
        //   assignment_percentage: `${student.assignment_percentage}%`,
        //   absences: student.absences
        // }));
        // setStudents(formattedStudents);
        setStudents([
          { id: 1, name: 'Ian Gilmore', assignment_percentage: '100%', absences: 0 },
          { id: 2, name: 'Addy Jaime', assignment_percentage: '100%', absences: 2 },
          { id: 3, name: 'Joshua Pierre', assignment_percentage: '100%', absences: 4 },
          { id: 4, name: 'Elton John', assignment_percentage: '50%', absences: 2 },
          { id: 5, name: 'Abel Tesfaye', assignment_percentage: '75%', absences: 1.33 },
          { id: 6, name: 'Alexa Clark', assignment_percentage: '100%', absences: 0 }
        ]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [courseId]);

  const handleNameClick = (studentId) => {
    navigate(`/${courseId}/students/${studentId}`);
  };

  const getRowStyle = (assignmentPercentage, absences) => {
    const percentage = parseFloat(assignmentPercentage);
    if (percentage >= 80) {
      if (absences <= 1) {
        return { bgcolor: '#d0f0c0' }; // Light green for 80-100% and absences 1 or less
      } else if (absences >= 2 && absences <= 3) {
        return { bgcolor: '#fff3cd' }; // Light yellow for 80-100% and absences 2-3
      } else if (absences >= 4) {
        return { bgcolor: '#e90000' }; // Dark red for 80-100% and absences 4 and higher
      }
    } else if (percentage < 80) {
      return { bgcolor: '#e90000' }; // Light red for 0-79%
    }
    return {};
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    // <Box display="flex" justifyContent="center" alignItems="center" >
      <TableContainer component={Paper} sx={{ maxWidth: 650, mx: "auto"}}>
        <Table aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Student</TableCell>
              <TableCell align="right" sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Assignment %</TableCell>
              <TableCell align="right" sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Absences</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} sx={getRowStyle(student.assignment_percentage, student.absences)}>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => handleNameClick(student.id)}
                    sx={{ textTransform: 'none', justifyContent: 'flex-start', color: 'inherit', padding: 0, minWidth: 'auto' }}
                  >
                    {student.name}
                  </Button>
                </TableCell>
                <TableCell align="right">{student.assignment_percentage}</TableCell>
                <TableCell align="right">{student.absences}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    // </Box>
  );
}
