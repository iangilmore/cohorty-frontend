import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Pagination, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourse } from '../../services/courses.js';

export default function StudentTable() {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [studentsPerPage] = useState(6); // Adjust the number of students per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getCourse(courseId);
        console.log('API response data:', data);

        // Since data is an array, find the correct object by courseId
        const courseData = data.find(course => course.id.toString() === courseId);

        if (courseData && courseData.students) {
          const studentsArray = courseData.students;
          console.log('studentsArray:', studentsArray);

          const formattedStudents = studentsArray.map(student => ({
            id: student.id,
            name: student.name,
            assignment_percentage: `${student.assignment_percentage}%`,
            absences: student.absences
          }));
          console.log('Formatted students:', formattedStudents);
          setStudents(formattedStudents);
        } else {
          throw new Error("Course not found or unexpected API response structure");
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [courseId]);

  const handleNameClick = (studentId, studentName) => {
    navigate(`/courses/${courseId}/students/${studentId}`, { state: { studentName } });
  };

  const getRowStyle = (assignmentPercentage, absences) => {
    const percentage = parseFloat(assignmentPercentage);
    if (percentage >= 80) {
      if (absences <= 1) {
        return { bgcolor: '#d0f0c0' }; // Light green for 80-100% and absences 1 or less
      } else if (absences >= 2 && absences <= 3) {
        return { bgcolor: '#fff3cd' }; // Light yellow for 80-100% and absences 2-3
      } else if (absences >= 4) {
        return { bgcolor: '#ffcdd2' }; // Dark red for 80-100% and absences 4 and higher
      }
    } else if (percentage < 80) {
      return { bgcolor: '#ffcdd2' }; // Light red for 0-79%
    }
    return {};
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Logic for displaying current students
  const indexOfLastStudent = page * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ minWidth: 500, mx: "auto" }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
        Students
      </Typography>
      <TableContainer sx={{ maxWidth: 650, mx: "auto" }}>
        <Table sx={{ '& .MuiTableRow-root': { borderBottom: '2px solid #FFF' } }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ position: 'sticky', top: 0, color: 'white', bgcolor: 'text.secondary', zIndex: 100 }}>
                Student
              </TableCell>
              <TableCell align="right" sx={{ position: 'sticky', top: 0, color: 'white', bgcolor: 'text.secondary', zIndex: 100 }}>
                Assignment %
              </TableCell>
              <TableCell align="right" sx={{ position: 'sticky', top: 0, color: 'white', bgcolor: 'text.secondary', zIndex: 100 }}>
                Absences
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStudents.map((student) => (
              <TableRow key={student.id} sx={getRowStyle(student.assignment_percentage, student.absences)}>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => handleNameClick(student.id, student.name)}
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
      <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <Pagination
          count={Math.ceil(students.length / studentsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

