// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { getCourseAssignments } from '../../services/assignments.js'; 

// export default function AssignmentsGrid({ courseId }) {
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         // const data = await getCourseAssignments(courseId);
//         // TODO: Change this line to set the assignments based on the data from the API i.e. setAssignments(data) and uncomment out the above
//         setAssignments([{ id: 1, name: 'JS Arrays Lab', dueDate: 'April 2' },
//         { id: 2, name: 'JS Function Lab', dueDate: 'April 5' },
//         { id: 3, name: 'JS Objects Lab', dueDate: 'April 8' },
//         { id: 4, name: 'JS Classes Lab', dueDate: 'April 12' },
//         { id: 5, name: 'Browser Based Game (Project 1)', dueDate: 'April 15' }]);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignments();
//   }, [courseId]);

//   //TODO: fix navigation
//   const handleNameClick = (courseId, assignmentId) => {
//     navigate(`/${courseId}/assignments/${assignmentId}`);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%">
//       <TableContainer component={Paper} sx={{ maxWidth: 650, mx: "auto" }}>
//         <Table aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Assignment</TableCell>
//               <TableCell align="right" sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Due Date</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {assignments.map((assignment) => (
//               <TableRow key={assignment.id}>
//                 <TableCell component="th" scope="row">
//                   <Button
//                     onClick={() => handleNameClick(courseId, assignment.id)}
//                     sx={{ textTransform: 'none', justifyContent: 'flex-start', color: 'inherit', padding: 0, minWidth: 'auto' }}
//                   >
//                     {assignment.name}
//                   </Button>
//                 </TableCell>
//                 <TableCell align="right">{assignment.dueDate}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCourseAssignments } from '../../services/assignments.js'; 

export default function AssignmentsGrid({ courseId }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // const data = await getCourseAssignments(courseId);
        // TODO: Change this line to set the assignments based on the data from the API i.e. setAssignments(data) and uncomment out the above
        setAssignments([{ id: 1, name: 'JS Arrays Lab', dueDate: 'April 2' },
        { id: 2, name: 'JS Function Lab', dueDate: 'April 5' },
        { id: 3, name: 'JS Objects Lab', dueDate: 'April 8' },
        { id: 4, name: 'JS Classes Lab', dueDate: 'April 12' },
        { id: 5, name: 'Browser Based Game (Project 1)', dueDate: 'April 15' }]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  const handleNameClick = (courseId, assignmentId) => {
    navigate(`/${courseId}/assignments/${assignmentId}`); // Ensure the correct values are passed
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%">
      <TableContainer component={Paper} sx={{ maxWidth: 650, mx: "auto" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Assignment</TableCell>
              <TableCell align="right" sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => handleNameClick(courseId, assignment.id)} // Use assignment.id for navigation
                    sx={{ textTransform: 'none', justifyContent: 'flex-start', color: 'inherit', padding: 0, minWidth: 'auto' }}
                  >
                    {assignment.name}
                  </Button>
                </TableCell>
                <TableCell align="right">{assignment.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
