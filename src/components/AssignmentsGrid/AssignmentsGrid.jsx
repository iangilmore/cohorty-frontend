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
import { useNavigate } from 'react-router-dom';
// import { getCourse, addAssignmentToCourse } from '../../services/courses.js'; // Comment out the import

export default function AssignmentsGrid({ courseId }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ name: '', dueDate: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // const data = await getCourse(courseId); // Comment out the API call

        // Mock data
        const data = {
          assignments: [
            { id: 1, name: 'JS Arrays Lab', dueDate: 'April 2' },
            { id: 2, name: 'JS Function Lab', dueDate: 'April 5' },
            { id: 3, name: 'JS Objects Lab', dueDate: 'April 8' },
            { id: 4, name: 'JS Classes Lab', dueDate: 'April 12' },
            { id: 5, name: 'Browser Based Game (Project 1)', dueDate: 'April 15' }
          ]
        };
        const formattedAssignments = data.assignments.map(assignment => ({
          id: assignment.id,
          name: assignment.name,
          dueDate: assignment.dueDate
        }));
        setAssignments(formattedAssignments);
      } catch (error) {
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
    // Mock data addition for now
    const newId = assignments.length + 1;
    const newAssignmentData = {
      id: newId,
      name: newAssignment.name,
      dueDate: new Date(newAssignment.dueDate).toLocaleDateString()
    };
    setAssignments((prev) => [...prev, newAssignmentData]);
    handleClose();

    // Uncomment below when API is ready
    // try {
    //   const data = await addAssignmentToCourse(courseId, newAssignment);
    //   setAssignments((prev) => [...prev, data]);
    //   handleClose();
    // } catch (error) {
    //   console.error("Error adding assignment:", error);
    // }
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

