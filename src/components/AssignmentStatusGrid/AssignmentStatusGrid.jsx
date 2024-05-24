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
//     const fetchData = async () => {
//       try {
//         const courseData = await getCourses(courseId);
//         const course = courseData.find(course => course.id.toString() === courseId);
        
//         if (course) {
//           const formattedAssignments = course.assignments.map(assignment => ({
//             id: assignment.id,
//             name: assignment.name
//           }));
//           setAssignments(formattedAssignments);

//           const studentData = await getStudentDetails(courseId, studentId);
//           const updatedAssignments = formattedAssignments.map(assignment => {
//             const submission = studentData.submissions.find(sub => sub.assignment === assignment.id) || {};
//             return {
//               ...assignment,
//               submitted: !!submission.is_complete,
//               complete: submission.is_complete || false
//             };
//           });
//           setAssignments(updatedAssignments);
//         } else {
//           setError('Course not found');
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [courseId, studentId]);

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
//       }
//       return assignment;
//     });

//     setAssignments(newAssignments);

//     try {
//       const studentData = await getStudentDetails(courseId, studentId);
//       const newSubmissions = newAssignments.map(a => ({
//         assignment: a.id,
//         student: studentId,
//         is_complete: a.complete
//       }));

//       const updatedSubmissions = studentData.submissions.filter(sub => !newSubmissions.some(ns => ns.assignment === sub.assignment));
//       updatedSubmissions.push(...newSubmissions);

//       await updateStudentDetails(courseId, studentId, {
//         submissions: updatedSubmissions,
//         attendance: studentData.attendance // Preserve existing attendance data
//       });
//     } catch (error) {
//       setError(error.message);
//     }
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

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Box,
  Pagination
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getCourses } from '../../services/courses.js';
import { getStudentDetails, updateStudentDetails } from '../../services/students.js';

function AssignmentStatusGrid() {
  const { courseId, studentId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const assignmentsPerPage = 5; // Adjust the number of assignments per page

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
      const studentData = await getStudentDetails(courseId, studentId);
      const newSubmissions = newAssignments.map(a => ({
        assignment: a.id,
        student: studentId,
        is_complete: a.complete
      }));

      const updatedSubmissions = studentData.submissions.filter(sub => !newSubmissions.some(ns => ns.assignment === sub.assignment));
      updatedSubmissions.push(...newSubmissions);

      await updateStudentDetails(courseId, studentId, {
        submissions: updatedSubmissions,
        attendance: studentData.attendance // Preserve existing attendance data
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Logic for displaying current assignments
  const indexOfLastAssignment = page * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = assignments.slice(indexOfFirstAssignment, indexOfLastAssignment);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ maxWidth: 650, mx: "auto", minHeight: '480px' }}> {/* Added margin top here */}
      <TableContainer component={Paper} sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <Table aria-label="assignment status" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: 'white', zIndex: 100 }}>Assignment</TableCell>
              <TableCell align="center" sx={{ backgroundColor: 'white', zIndex: 100 }}>Submitted</TableCell>
              <TableCell align="center" sx={{ backgroundColor: 'white', zIndex: 100 }}>Complete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentAssignments.map((assignment, index) => (
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
      <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <Pagination 
          count={Math.ceil(assignments.length / assignmentsPerPage)} 
          page={page} 
          onChange={handlePageChange} 
        />
      </Box>
    </Box>
  );
}

export default AssignmentStatusGrid;


