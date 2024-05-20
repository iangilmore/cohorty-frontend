import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCourseStudents } from '../../services/students.js';

export default function StudentTable({ courseId }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // const data = await getCourseStudents(courseId);
        setStudents([
          { id: 1, name: 'Ian Gilmore', assignment: '100%', absences: 0 },
          { id: 2, name: 'Addy Jaime', assignment: '100%', absences: 0 },
          { id: 3, name: 'Joshua Pierre', assignment: '100%', absences: 0 },
          { id: 4, name: 'Elton John', assignment: '50%', absences: 2 },
          { id: 5, name: 'Abel Tesfaye', assignment: '75%', absences: 1.33 },
          { id: 6, name: 'Alexa Clark', assignment: '100%', absences: 0 }
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <TableContainer component={Paper} sx={{ maxWidth: 650, mx: "auto" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Student</TableCell>
              <TableCell align="right" sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Assignment Completion</TableCell>
              <TableCell align="right" sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Absences</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => handleNameClick(student.id)}
                    sx={{ textTransform: 'none', justifyContent: 'flex-start', color: 'inherit', padding: 0, minWidth: 'auto' }}
                  >
                    {student.name}
                  </Button>
                </TableCell>
                <TableCell align="right">{student.assignment}</TableCell>
                <TableCell align="right">{student.absences}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

