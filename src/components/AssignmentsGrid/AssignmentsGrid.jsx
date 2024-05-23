// import { useState, useEffect } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField
// } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getCourse } from '../../services/courses.js';

// export default function AssignmentsGrid() {
//   const { courseId } = useParams();
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [newAssignment, setNewAssignment] = useState({ name: '', dueDate: '' });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const data = await getCourse(courseId);
//         console.log('API response data:', data);

//         // Since data is an array, find the correct object by courseId
//         const courseData = data.find(course => course.id.toString() === courseId);

//         if (courseData && courseData.assignments) {
//           const formattedAssignments = courseData.assignments.map(assignment => ({
//             id: assignment.id,
//             name: assignment.name,
//             dueDate: assignment.due_date
//           }));
//           setAssignments(formattedAssignments);
//         } else {
//           throw new Error("Course not found or unexpected API response structure");
//         }
//       } catch (error) {
//         console.error('Error fetching assignments:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignments();
//   }, [courseId]);

//   const handleNameClick = (assignmentId) => {
//     navigate(`/${courseId}/assignments/${assignmentId}`);
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewAssignment((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddAssignment = async () => {
//     // Mock data addition for now
//     const newId = assignments.length + 1;
//     const newAssignmentData = {
//       id: newId,
//       name: newAssignment.name,
//       dueDate: new Date(newAssignment.dueDate).toLocaleDateString()
//     };
//     setAssignments((prev) => [...prev, newAssignmentData]);
//     handleClose();

//     // Uncomment below when API is ready
//     // try {
//     //   const data = await addAssignmentToCourse(courseId, newAssignment);
//     //   setAssignments((prev) => [...prev, data]);
//     //   handleClose();
//     // } catch (error) {
//     //   console.error("Error adding assignment:", error);
//     // }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
//       <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mb: 2 }}>
//         Add Assignment
//       </Button>
//       <TableContainer component={Paper} sx={{ maxWidth: 650, mx: "auto" }}>
//         <Table aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Assignment</TableCell>
//               <TableCell align="right" sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Due Date</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {assignments.map((assignment, index) => (
//               <TableRow key={assignment.id} sx={{ bgcolor: index % 2 === 0 ? '#e0f7fa' : '#f0f0f0' }}>
//                 <TableCell component="th" scope="row">
//                   <Button
//                     onClick={() => handleNameClick(assignment.id)}
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

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Assignment</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To add a new assignment, please enter the assignment name and due date here.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="name"
//             label="Assignment Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={newAssignment.name}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="dueDate"
//             label="Due Date"
//             type="date"
//             fullWidth
//             variant="standard"
//             InputLabelProps={{
//               shrink: true,
//             }}
//             value={newAssignment.dueDate}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleAddAssignment} color="primary">
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourse } from '../../services/courses.js';
import { addAssignmentToCourse } from '../../services/assignments.js';

export default function AssignmentsGrid() {
  const { courseId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ name: '', dueDate: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getCourse(courseId);
        console.log('API response data:', data);

        const courseData = data.find(course => course.id.toString() === courseId);

        if (courseData && courseData.assignments) {
          const formattedAssignments = courseData.assignments.map(assignment => ({
            id: assignment.id,
            name: assignment.name,
            dueDate: assignment.due_date
          }));
          setAssignments(formattedAssignments);
        } else {
          throw new Error("Course not found or unexpected API response structure");
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  const handleNameClick = (assignmentId) => {
    navigate(`/${courseId}/assignments/${assignmentId}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAssignment = async () => {
    try {
      const newAssignmentData = {
        name: newAssignment.name,
        due_date: newAssignment.dueDate, // Ensure this is in YYYY-MM-DD format
      };
      console.log('Sending new assignment data:', newAssignmentData);
      const data = await addAssignmentToCourse(courseId, newAssignmentData);
      setAssignments((prev) => [...prev, data]);
      handleClose();
    } catch (error) {
      console.error("Error adding assignment:", error.response ? error.response.data : error.message);
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mb: 2 }}>
        Add Assignment
      </Button>
      <TableContainer component={Paper} sx={{ maxWidth: 650, mx: "auto" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Assignment</TableCell>
              <TableCell align="right" sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment, index) => (
              <TableRow key={assignment.id} sx={{ bgcolor: index % 2 === 0 ? '#e0f7fa' : '#f0f0f0' }}>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => handleNameClick(assignment.id)}
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Assignment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new assignment, please enter the assignment name and due date here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Assignment Name"
            type="text"
            fullWidth
            variant="standard"
            value={newAssignment.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            value={newAssignment.dueDate}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddAssignment} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

