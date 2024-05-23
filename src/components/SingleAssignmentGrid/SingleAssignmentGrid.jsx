// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, Box } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getCourse } from '../../services/courses.js';
// import { getAssignmentDetails, updateAssignmentDetails } from '../../services/assignments.js';

// export default function SingleAssignmentGrid() {
//   const { courseId, assignmentId } = useParams();

//   const [students, setStudents] = useState([]);
//   const [assignments, setAssignments] = useState([]);
//   const [assignmentData, setAssignmentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentsAndAssignments = async () => {
//       try {
//         const courseDataArray = await getCourse(courseId);
//         const assignmentDetails = await getAssignmentDetails(courseId, assignmentId);

//         const courseData = courseDataArray.find(course => course.id.toString() === courseId);

//         if (!courseData) {
//           throw new Error("Course not found");
//         }

//         setStudents(courseData.students);
//         setAssignmentData(assignmentDetails);

//         const formattedAssignments = courseData.students.map(student => {
//           const submission = assignmentDetails.submissions.find(sub => sub.student === student.id) || {};
//           return {
//             id: student.id,
//             name: student.name,
//             submitted: !!submission.id,
//             complete: submission.is_complete || false
//           };
//         });

//         setAssignments(formattedAssignments);
//       } catch (error) {
//         console.error('Error fetching students and assignments:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentsAndAssignments();
//   }, [courseId, assignmentId]);

//   const handleCheckboxChange = (id, field) => {
//     setAssignments(prevAssignments =>
//       prevAssignments.map(assignment => {
//         if (assignment.id === id) {
//           if (field === 'complete') {
//             return { ...assignment, submitted: true, complete: !assignment.complete };
//           } else if (field === 'submitted') {
//             if (assignment.complete) {
//               return assignment;
//             } else {
//               return { ...assignment, submitted: !assignment.submitted };
//             }
//           }
//         }
//         return assignment;
//       })
//     );
//   };

//   const handleNavigateAway = async () => {
//     try {
//       await Promise.all(
//         assignments.map(async (assignment) => {
//           if (assignment.submitted) {
//             await updateAssignmentDetails(assignmentId, assignment.id, { is_complete: assignment.complete });
//           }
//         })
//       );
//     } catch (error) {
//       console.error("Error updating assignment details:", error);
//     }
//   };

//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       handleNavigateAway();
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       handleNavigateAway();
//     };
//   }, [assignments]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <Box sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}>
//       <Box sx={{ maxWidth: 800, width: '100%', bgcolor: 'background.paper', p: 2, boxShadow: 3, borderRadius: 2 }}>
//         {assignmentData && (
//           <>
//             <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
//               {assignmentData.name}
//             </Typography>
//             <Typography variant="subtitle1" sx={{ mb: 4, textAlign: 'center' }}>
//               due {new Date(assignmentData.due_date).toLocaleDateString()}
//             </Typography>
//           </>
//         )}
//         <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
//           <Table sx={{ minWidth: 650 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell align="center">Submitted</TableCell>
//                 <TableCell align="center">Complete</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {assignments.map((assignment, index) => (
//                 <TableRow key={assignment.id} sx={{ bgcolor: assignment.complete ? '#c8e6c9' : assignment.submitted ? '#ffecb3' : '#ffcdd2' }}>
//                   <TableCell>{assignment.name}</TableCell>
//                   <TableCell align="center">
//                     <Checkbox
//                       checked={assignment.submitted}
//                       onChange={() => handleCheckboxChange(assignment.id, 'submitted')}
//                       color="primary"
//                       disabled={assignment.complete}
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <Checkbox
//                       checked={assignment.complete}
//                       onChange={() => handleCheckboxChange(assignment.id, 'complete')}
//                       color="primary"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, Box } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getCourse } from '../../services/courses.js';
// import { getAssignmentDetails, updateAssignmentDetails } from '../../services/assignments.js';

// export default function SingleAssignmentGrid() {
//   const { courseId, assignmentId } = useParams();

//   const [students, setStudents] = useState([]);
//   const [assignments, setAssignments] = useState([]);
//   const [assignmentData, setAssignmentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentsAndAssignments = async () => {
//       try {
//         const courseDataArray = await getCourse(courseId);
//         const assignmentDetails = await getAssignmentDetails(courseId, assignmentId);

//         const courseData = courseDataArray.find(course => course.id.toString() === courseId);

//         if (!courseData) {
//           throw new Error("Course not found");
//         }

//         setStudents(courseData.students);
//         setAssignmentData(assignmentDetails);

//         const formattedAssignments = courseData.students.map(student => {
//           const submission = assignmentDetails.submissions.find(sub => sub.student === student.id) || {};
//           return {
//             id: student.id,
//             name: student.name,
//             submitted: !!submission.id,
//             complete: submission.is_complete || false
//           };
//         });

//         setAssignments(formattedAssignments);
//       } catch (error) {
//         console.error('Error fetching students and assignments:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentsAndAssignments();
//   }, [courseId, assignmentId]);

//   const handleCheckboxChange = async (id, field) => {
//     const updatedAssignments = assignments.map(assignment => {
//       if (assignment.id === id) {
//         if (field === 'complete') {
//           return { ...assignment, submitted: true, complete: !assignment.complete };
//         } else if (field === 'submitted') {
//           if (assignment.complete) {
//             return assignment;
//           } else {
//             return { ...assignment, submitted: !assignment.submitted };
//           }
//         }
//       }
//       return assignment;
//     });

//     setAssignments(updatedAssignments);

//     const updatedAssignment = updatedAssignments.find(assignment => assignment.id === id);
//     const updatedFields = {
//       name: assignmentData.name,
//       due_date: assignmentData.due_date,
//       is_complete: updatedAssignment.complete,
//     };

//     try {
//       await updateAssignmentDetails(assignmentId, id, updatedFields);
//     } catch (error) {
//       console.error("Error updating assignment details:", error);
//       setError("Failed to update assignment details.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <Box sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}>
//       <Box sx={{ maxWidth: 800, width: '100%', bgcolor: 'background.paper', p: 2, boxShadow: 3, borderRadius: 2 }}>
//         {assignmentData && (
//           <>
//             <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
//               {assignmentData.name}
//             </Typography>
//             <Typography variant="subtitle1" sx={{ mb: 4, textAlign: 'center' }}>
//               due {new Date(assignmentData.due_date).toLocaleDateString()}
//             </Typography>
//           </>
//         )}
//         <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
//           <Table sx={{ minWidth: 650 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell align="center">Submitted</TableCell>
//                 <TableCell align="center">Complete</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {assignments.map((assignment, index) => (
//                 <TableRow key={assignment.id} sx={{ bgcolor: assignment.complete ? '#c8e6c9' : assignment.submitted ? '#ffecb3' : '#ffcdd2' }}>
//                   <TableCell>{assignment.name}</TableCell>
//                   <TableCell align="center">
//                     <Checkbox
//                       checked={assignment.submitted}
//                       onChange={() => handleCheckboxChange(assignment.id, 'submitted')}
//                       color="primary"
//                       disabled={assignment.complete}
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <Checkbox
//                       checked={assignment.complete}
//                       onChange={() => handleCheckboxChange(assignment.id, 'complete')}
//                       color="primary"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourse } from '../../services/courses.js';
import { getAssignmentDetails, updateAssignmentDetails } from '../../services/assignments.js';

export default function SingleAssignmentGrid() {
  const { courseId, assignmentId } = useParams();

  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [assignmentData, setAssignmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentsAndAssignments = async () => {
      try {
        const courseDataArray = await getCourse(courseId);
        const assignmentDetails = await getAssignmentDetails(courseId, assignmentId);

        const courseData = courseDataArray.find(course => course.id.toString() === courseId);

        if (!courseData) {
          throw new Error("Course not found");
        }

        setStudents(courseData.students);
        setAssignmentData(assignmentDetails);

        const formattedAssignments = courseData.students.map(student => {
          const submission = assignmentDetails.submissions.find(sub => sub.student === student.id) || {};
          return {
            id: student.id,
            name: student.name,
            submitted: !!submission.id,
            complete: submission.is_complete || false
          };
        });

        setAssignments(formattedAssignments);
      } catch (error) {
        console.error('Error fetching students and assignments:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsAndAssignments();
  }, [courseId, assignmentId]);

  const handleCheckboxChange = async (id, field) => {
    const updatedAssignments = assignments.map(assignment => {
      if (assignment.id === id) {
        if (field === 'complete') {
          return { ...assignment, submitted: true, complete: !assignment.complete };
        } else if (field === 'submitted') {
          if (assignment.complete) {
            return assignment;
          } else {
            return { ...assignment, submitted: !assignment.submitted };
          }
        }
      }
      return assignment;
    });

    setAssignments(updatedAssignments);

    const updatedAssignment = updatedAssignments.find(assignment => assignment.id === id);
    const updatedFields = {
      name: assignmentData.name,
      due_date: assignmentData.due_date,
      is_complete: updatedAssignment.complete,
    };

    try {
      await updateAssignmentDetails(assignmentId, id, updatedFields);
    } catch (error) {
      console.error("Error updating assignment details:", error);
      setError("Failed to update assignment details.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: 800, width: '100%', bgcolor: 'background.paper', p: 2, boxShadow: 3, borderRadius: 2 }}>
        {assignmentData && (
          <>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
              {assignmentData.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 4, textAlign: 'center' }}>
              due {new Date(assignmentData.due_date).toLocaleDateString()}
            </Typography>
          </>
        )}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Submitted</TableCell>
                <TableCell align="center">Complete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((assignment, index) => (
                <TableRow key={assignment.id} sx={{ bgcolor: assignment.complete ? '#c8e6c9' : assignment.submitted ? '#ffecb3' : '#ffcdd2' }}>
                  <TableCell>{assignment.name}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={assignment.submitted}
                      onChange={() => handleCheckboxChange(assignment.id, 'submitted')}
                      color="primary"
                      disabled={assignment.complete}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={assignment.complete}
                      onChange={() => handleCheckboxChange(assignment.id, 'complete')}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

