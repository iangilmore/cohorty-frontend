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
//           {assignments.map((assignment) => (
//             <TableRow key={assignment.id}>
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
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCourse } from '../../services/courses.js';
import { getAssignmentDetails, updateAssignmentDetails } from '../../services/assignments.js';

export default function AssignmentStatusGrid({ courseId, assignmentId }) {
  const [students, setStudents] = useState([]); // State to hold the list of students
  const [assignments, setAssignments] = useState([]); // State to hold the assignment status for each student
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchStudentsAndAssignments = async () => {
      try {
        // Fetch course details to get the list of students
        const courseData = await getCourse(courseId);
        // Fetch assignment details to get the submissions
        const assignmentData = await getAssignmentDetails(assignmentId);

        // Format assignments: match each student with their submission if it exists
        const formattedAssignments = courseData.students.map(student => {
          const submission = assignmentData.submissions.find(sub => sub.student === student.name) || {};
          return {
            id: student.id, // Use student's ID
            name: student.name, // Use student's name
            submitted: !!submission.id, // True if a submission entry exists for the student
            complete: submission.is_complete || false // True if the submission entry's is_complete is true
          };
        });

        setStudents(courseData.students); // Set the students state
        setAssignments(formattedAssignments); // Set the assignments state
      } catch (error) {
        setError(error.message); // Set the error state if an error occurs
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchStudentsAndAssignments(); // Call the fetch function
  }, [courseId, assignmentId]); // Dependency array ensures this runs when courseId or assignmentId changes

  // Handle checkbox change: update local state based on user interaction
  const handleCheckboxChange = (id, field) => {
    const newAssignments = assignments.map((assignment) => {
      if (assignment.id === id) {
        if (field === 'complete') {
          // If marking complete, also mark submitted
          return { ...assignment, submitted: true, complete: !assignment.complete };
        } else if (field === 'submitted') {
          if (assignment.complete) {
            return assignment; // Ignore changes to submitted if complete is true
          } else {
            // Toggle submitted only if complete is not checked
            return { ...assignment, submitted: !assignment.submitted };
          }
        }
      }
      return assignment;
    });
    setAssignments(newAssignments); // Update the assignments state
  };

  // Handle navigation away: update assignment details on server
  const handleNavigateAway = async () => {
    try {
      // Update the assignment details for each student who has submitted
      await Promise.all(
        assignments.map(async (assignment) => {
          if (assignment.submitted) {
            await updateAssignmentDetails(assignmentId, assignment.id, { is_complete: assignment.complete });
          }
        })
      );
    } catch (error) {
      console.error("Error updating assignment details:", error);
    }
  };

  // Ensure updates are sent when user navigates away from the page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      handleNavigateAway(); // Call the function to update assignment details
    };

    window.addEventListener("beforeunload", handleBeforeUnload); // Add event listener for page unload
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload); // Cleanup event listener
      handleNavigateAway(); // Ensure updates are sent when the component is unmounted
    };
  }, [assignments]); // Dependency array ensures this runs when assignments changes

  if (loading) return <p>Loading...</p>; // Display loading message if data is still being fetched
  if (error) return <p>Error: {error}</p>; // Display error message if an error occurred

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 650, margin: 'auto', mt: 4 }}>
      <Table aria-label="assignment status">
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell align="center">Submitted</TableCell>
            <TableCell align="center">Complete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.name}</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={assignment.submitted}
                  onChange={() => handleCheckboxChange(assignment.id, 'submitted')}
                  color="primary"
                  disabled={assignment.complete} // Disable the checkbox interaction if complete is true
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
