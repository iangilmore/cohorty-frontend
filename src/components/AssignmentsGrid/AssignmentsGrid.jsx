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
        // TODO: Change this line to set the assignments based on the data from the API
        setAssignments([{ name: 'JS Arrays Lab', dueDate: 'April 2' }, { name: 'JS Function Lab', dueDate: 'April 5' },{ name: 'JS Objects Lab', dueDate: 'April 8' },{ name: 'JS Classes Lab', dueDate: 'April 12' },{ name: 'Browser Based Game (Project 1)', dueDate: 'April 15' }]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  const handleNameClick = (courseId, assignmentId) => {
    navigate(`/${courseId}/assignments/${assignmentId}`);
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
                    onClick={() => handleNameClick(courseId, assignment.id)}
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

// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// export default function AssignmentsGrid() {

//   //TODO: Fix navigation on click
//   const navigate = useNavigate();

//   const handleClick = (courseId, assignmentId) => {
//     navigate(`/${courseId}/assignments/${assignmentId}`, { state: { courseName } });
//   };

//   const rows = [
//     { name: 'JS Arrays Lab', dueDate: 'April 2' },
//     { name: 'JS Function Lab', dueDate: 'April 5' },
//     { name: 'JS Objects Lab', dueDate: 'April 8' },
//     { name: 'JS Classes Lab', dueDate: 'April 12' },
//     { name: 'Browser Based Game (Project 1)', dueDate: 'April 15' }
//   ];

//   // Function to handle click event on assignment name
//   const handleNameClick = (name) => {
//     console.log("Clicked on: ", name);

//   };

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
//             {rows.map((row) => (
//               <TableRow key={row.name}>
//                 <TableCell component="th" scope="row">
//                   {/* Wrap assignment name in a Button for clickable functionality */}
//                   <Button
//                     onClick={() => handleNameClick(row.name)}
//                     sx={{ textTransform: 'none', justifyContent: 'flex-start', color: 'inherit', padding: 0, minWidth: 'auto' }} // Minimal button styling
//                   >
//                     {row.name}
//                   </Button>
//                 </TableCell>
//                 <TableCell align="right">{row.dueDate}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }
