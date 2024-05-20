import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCourseAssignments, addAssignmentToCourse } from '../../services/assignments.js'; 

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
      const data = await addAssignmentToCourse(courseId, newAssignment);
      setAssignments((prev) => [...prev, data]);
      handleClose();
    } catch (error) {
      console.error("Error adding assignment:", error);
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
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
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
