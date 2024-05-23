// import { useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Checkbox,
//   Paper
// } from '@mui/material';

// function AssignmentStatusGrid() {
//   const [assignments, setAssignments] = useState([
//     { id: 1, name: 'JS Arrays Lab', submitted: true, complete: true },
//     { id: 2, name: 'JS Function Lab', submitted: false, complete: false },
//     { id: 3, name: 'JS Objects Lab', submitted: true, complete: true },
//     { id: 4, name: 'JS Classes Lab', submitted: true, complete: false },
//     { id: 5, name: 'Browser Based Game (Project 1)', submitted: true, complete: false }
//   ]);

//   // Handle checkbox change
//   const handleCheckboxChange = (id, field) => {
//     const newAssignments = assignments.map((assignment) => {
//       if (assignment.id === id) {
//         if (field === 'complete') {
//           // If marking complete, also mark submitted
//           return { ...assignment, submitted: true, complete: !assignment.complete };
//         } else if (field === 'submitted') {
//           // Prevent unchecking submitted if complete is checked
//           if (assignment.complete) {
//             return assignment; // Ignore changes to submitted if complete is true
//           } else {
//             // Toggle submitted only if complete is not checked
//             return { ...assignment, submitted: !assignment.submitted };
//           }
//         }
//       }
//       return assignment;
//     });
//     setAssignments(newAssignments);
//   };

//   return (
//     <TableContainer component={Paper} sx={{ maxWidth: 650, margin: 'auto', mt: 4 }}>
//       <Table aria-label="assignment status">
//         <TableHead>
//           <TableRow>
//             <TableCell>Assignment</TableCell>
//             <TableCell align="center">Submitted</TableCell>
//             <TableCell align="center">Complete</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {assignments.map((assignment, index) => (
//             <TableRow key={assignment.id} sx={{ bgcolor: index % 2 === 0 ? '#e0f7fa' : '#f0f0f0' }}>
//               <TableCell>{assignment.name}</TableCell>
//               <TableCell align="center">
//                 <Checkbox
//                   checked={assignment.submitted}
//                   onChange={() => handleCheckboxChange(assignment.id, 'submitted')}
//                   color="primary"
//                   // Disable the checkbox interaction if complete is true
//                   disabled={assignment.complete}
//                 />
//               </TableCell>
//               <TableCell align="center">
//                 <Checkbox
//                   checked={assignment.complete}
//                   onChange={() => handleCheckboxChange(assignment.id, 'complete')}
//                   color="primary"
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default AssignmentStatusGrid;


/////////// 
// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Checkbox,
//   Paper
// } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import { getCourses } from '../../services/courses.js';
// import { getStudentDetails, updateStudentDetails } from '../../services/students.js';

// function AssignmentStatusGrid() {
//   const { courseId, studentId } = useParams();
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         const courseData = await getCourses(courseId);
//         const course = courseData.find(course => course.id.toString() === courseId);
  
//         if (course) {
//           const formattedAssignments = course.assignments.map(assignment => ({
//             id: assignment.id,
//             name: assignment.name,
//             submitted: false, // Initialize as false, will update with actual data
//             complete: false // Initialize as false, will update with actual data
//           }));
//           setAssignments(formattedAssignments);
//         } else {
//           setError('Course not found');
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchCourseDetails();
//   }, [courseId]);

//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       try {
//         const studentData = await getStudentDetails(courseId, studentId);
        
//         if (studentData) {
//           const updatedAssignments = assignments.map(assignment => {
//             const submission = studentData.submissions.find(sub => sub.assignment === assignment.id) || {};
//             return {
//               ...assignment,
//               submitted: submission.submitted || false,
//               complete: submission.is_complete || false
//             };
//           });
//           setAssignments(updatedAssignments);
//         } else {
//           setError('Student not found');
//         }
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     if (assignments.length > 0) {
//       fetchStudentDetails();
//     }
//   }, [courseId, studentId, assignments]);

//   const handleCheckboxChange = async (id, field) => {
//     const newAssignments = assignments.map((assignment) => {
//       if (assignment.id === id) {
//         if (field === 'complete') {
//           assignment = { ...assignment, submitted: true, complete: !assignment.complete };
//         } else if (field === 'submitted') {
//           if (assignment.complete) {
//             return assignment;
//           } else {
//             assignment = { ...assignment, submitted: !assignment.submitted };
//           }
//         }

//         updateStudentDetails(courseId, studentId, {
//           submissions: newAssignments.map(a => ({
//             id: a.id,
//             is_complete: a.complete,
//             submitted: a.submitted
//           }))
//         });
//       }
//       return assignment;
//     });

//     setAssignments(newAssignments);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <TableContainer component={Paper} sx={{ maxWidth: 650, margin: 'auto', mt: 4 }}>
//       <Table aria-label="assignment status">
//         <TableHead>
//           <TableRow>
//             <TableCell>Assignment</TableCell>
//             <TableCell align="center">Submitted</TableCell>
//             <TableCell align="center">Complete</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {assignments.map((assignment, index) => (
//             <TableRow key={assignment.id} sx={{ bgcolor: index % 2 === 0 ? '#e0f7fa' : '#f0f0f0' }}>
//               <TableCell>{assignment.name}</TableCell>
//               <TableCell align="center">
//                 <Checkbox
//                   checked={assignment.submitted}
//                   onChange={() => handleCheckboxChange(assignment.id, 'submitted')}
//                   color="primary"
//                   disabled={assignment.complete}
//                 />
//               </TableCell>
//               <TableCell align="center">
//                 <Checkbox
//                   checked={assignment.complete}
//                   onChange={() => handleCheckboxChange(assignment.id, 'complete')}
//                   color="primary"
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default AssignmentStatusGrid;

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getCourses } from '../../services/courses.js';
import { getStudentDetails, updateStudentDetails } from '../../services/students.js';

function AssignmentStatusGrid() {
  const { courseId, studentId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourses(courseId);
        const course = courseData.find(course => course.id.toString() === courseId);
        
        if (course) {
          const formattedAssignments = course.assignments.map(assignment => ({
            id: assignment.id,
            name: assignment.name
          }));
          setAssignments(formattedAssignments);

          const studentData = await getStudentDetails(courseId, studentId);
          const updatedAssignments = formattedAssignments.map(assignment => {
            const submission = studentData.submissions.find(sub => sub.assignment === assignment.id) || {};
            return {
              ...assignment,
              submitted: !!submission.is_complete,
              complete: submission.is_complete || false
            };
          });
          setAssignments(updatedAssignments);
        } else {
          setError('Course not found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, studentId]);

  const handleCheckboxChange = async (id, field) => {
    const newAssignments = assignments.map((assignment) => {
      if (assignment.id === id) {
        if (field === 'complete') {
          assignment = { ...assignment, submitted: true, complete: !assignment.complete };
        } else if (field === 'submitted') {
          if (assignment.complete) {
            return assignment;
          } else {
            assignment = { ...assignment, submitted: !assignment.submitted };
          }
        }
      }
      return assignment;
    });

    setAssignments(newAssignments);

    try {
      await updateStudentDetails(courseId, studentId, {
        submissions: newAssignments.map(a => ({
          assignment: a.id,
          student: studentId,
          is_complete: a.complete
        }))
      });
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
            <TableCell align="center">Submitted</TableCell>
            <TableCell align="center">Complete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments.map((assignment, index) => (
            <TableRow key={assignment.id} sx={{ bgcolor: index % 2 === 0 ? '#e0f7fa' : '#f0f0f0' }}>
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
  );
}

export default AssignmentStatusGrid;
