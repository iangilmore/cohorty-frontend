// import { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// // Mock services imports
// // import { getCourse } from '../../services/courses.js';
// // import { getAssignmentDetails, updateAssignmentDetails } from '../../services/assignments.js';

// export default function SingleAssignmentGrid({ courseId, assignmentId }) {
//     const [students, setStudents] = useState([]);
//     const [assignments, setAssignments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const assignmentData = {
//         id: 1,
//         name: 'JavaScript Arrays Lab',
//         due_date: '2024-03-11',
//         submissions: [
//             { id: 1, student: 'Ian Gilmore', is_complete: true }
//         ]
//     };

//     useEffect(() => {
//         const fetchStudentsAndAssignments = async () => {
//             try {
//                 // Mocking the API calls with hardcoded data
//                 // const courseData = await getCourse(courseId);
//                 // const assignmentData = await getAssignmentDetails(assignmentId);

//                 // const formattedAssignments = courseData.students.map(student => {
//                 //     const submission = assignmentData.submissions.find(sub => sub.student === student.name) || {};
//                 //     return {
//                 //         id: student.id,
//                 //         name: student.name,
//                 //         submitted: !!submission.id,
//                 //         complete: submission.is_complete || false
//                 //     };
//                 // });

//                 // Mock data for students and assignments
//                 setStudents([
//                     { id: 1, name: 'Ian Gilmore', assignment_percentage: '100%', absences: 0 },
//                     { id: 2, name: 'Addy Jaime', assignment_percentage: '100%', absences: 0 },
//                     { id: 3, name: 'Joshua Pierre', assignment_percentage: '100%', absences: 0 },
//                     { id: 4, name: 'Elton John', assignment_percentage: '50%', absences: 2 },
//                     { id: 5, name: 'Abel Tesfaye', assignment_percentage: '75%', absences: 1.33 },
//                     { id: 6, name: 'Alexa Clark', assignment_percentage: '100%', absences: 0 }
//                 ]);

//                 setAssignments([
//                     { id: 1, name: 'Ian Gilmore', submitted: true, complete: true },
//                     { id: 2, name: 'Addy Jaime', submitted: false, complete: true },
//                     { id: 3, name: 'Joshua Pierre', submitted: true, complete: true },
//                     { id: 4, name: 'Elton John', submitted: false, complete: false },
//                     { id: 5, name: 'Abel Tesfaye', submitted: true, complete: false },
//                     { id: 6, name: 'Alexa Clark', submitted: true, complete: true },
//                 ]);

//                 // setStudents(courseData.students);
//                 // setAssignments(formattedAssignments);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchStudentsAndAssignments();
//     }, [courseId, assignmentId]);

//     const handleCheckboxChange = (id, field) => {
//         const newAssignments = assignments.map((assignment) => {
//             if (assignment.id === id) {
//                 if (field === 'complete') {
//                     return { ...assignment, submitted: true, complete: !assignment.complete };
//                 } else if (field === 'submitted') {
//                     if (assignment.complete) {
//                         return assignment;
//                     } else {
//                         return { ...assignment, submitted: !assignment.submitted };
//                     }
//                 }
//             }
//             return assignment;
//         });
//         setAssignments(newAssignments);
//     };

//     const handleNavigateAway = async () => {
//         try {
//             await Promise.all(
//                 assignments.map(async (assignment) => {
//                     if (assignment.submitted) {
//                         await updateAssignmentDetails(assignmentId, assignment.id, { is_complete: assignment.complete });
//                     }
//                 })
//             );
//         } catch (error) {
//             console.error("Error updating assignment details:", error);
//         }
//     };

//     useEffect(() => {
//         const handleBeforeUnload = (event) => {
//             event.preventDefault();
//             handleNavigateAway();
//         };

//         window.addEventListener("beforeunload", handleBeforeUnload);
//         return () => {
//             window.removeEventListener("beforeunload", handleBeforeUnload);
//             handleNavigateAway();
//         };
//     }, [assignments]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <Box sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}>
//             <Box sx={{ maxWidth: 800, width: '100%', bgcolor: 'background.paper', p: 2, boxShadow: 3, borderRadius: 2 }}>
//                 <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
//                     {assignmentData.name}
//                 </Typography>
//                 <Typography variant="subtitle1" sx={{ mb: 4, textAlign: 'center' }}>
//                     due {new Date(assignmentData.due_date).toLocaleDateString()}
//                 </Typography>
//                 <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
//                     <Table sx={{ minWidth: 650 }}>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell align="center">Submitted</TableCell>
//                                 <TableCell align="center">Complete</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {assignments.map((assignment, index) => (
//                                 <TableRow key={assignment.id} sx={{ bgcolor: index % 2 === 0 ? '#e0f7fa' : '#f0f0f0' }}>
//                                     <TableCell>{assignment.name}</TableCell>
//                                     <TableCell align="center">
//                                         <Checkbox
//                                             checked={assignment.submitted}
//                                             onChange={() => handleCheckboxChange(assignment.id, 'submitted')}
//                                             color="primary"
//                                             disabled={assignment.complete}
//                                         />
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <Checkbox
//                                             checked={assignment.complete}
//                                             onChange={() => handleCheckboxChange(assignment.id, 'complete')}
//                                             color="primary"
//                                         />
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </Box>
//     );
// }

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Button
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getCourses } from '../../services/courses.js';
import { getStudentDetails, updateStudentDetails } from '../../services/students.js';

function AssignmentStatusGrid() {
  const { courseId, studentId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [initialSubmissions, setInitialSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseData, studentData] = await Promise.all([
          getCourses(courseId),
          getStudentDetails(courseId, studentId)
        ]);

        const course = courseData.find(course => course.id.toString() === courseId);
        if (course) {
          setAssignments(course.assignments.map(assignment => ({
            id: assignment.id,
            name: assignment.name
          })));
        }

        const formattedSubmissions = studentData.submissions.map(submission => ({
          assignment: submission.assignment,
          student: submission.student,
          is_complete: submission.is_complete
        }));
        setSubmissions(formattedSubmissions);
        setInitialSubmissions(formattedSubmissions);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, studentId]);

  const handleCheckboxChange = (assignmentId, field) => {
    const newSubmissions = submissions.map(submission => {
      if (submission.assignment === assignmentId) {
        if (field === 'complete') {
          return { ...submission, is_complete: !submission.is_complete };
        }
      }
      return submission;
    });

    setSubmissions(newSubmissions);
  };

  const handleConfirmChanges = async () => {
    try {
      await updateStudentDetails(courseId, studentId, { submissions });
      setInitialSubmissions(submissions);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 650, margin: 'auto', mt: 4 }}>
      <Table aria-label="assignment status">
        <TableHead>
          <TableRow>
            <TableCell>Assignment</TableCell>
            <TableCell align="center">Complete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments.map((assignment, index) => {
            const submission = submissions.find(sub => sub.assignment === assignment.id) || {};
            return (
              <TableRow key={assignment.id} sx={{ bgcolor: index % 2 === 0 ? '#e0f7fa' : '#f0f0f0' }}>
                <TableCell>{assignment.name}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={submission.is_complete || false}
                    onChange={() => handleCheckboxChange(assignment.id, 'complete')}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleConfirmChanges}
      >
        Confirm Changes
      </Button>
    </TableContainer>
  );
}

export default AssignmentStatusGrid;
