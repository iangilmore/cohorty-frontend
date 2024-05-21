import { useState } from 'react';
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

function AssignmentStatusGrid() {
  const [assignments, setAssignments] = useState([
    { id: 1, name: 'JS Arrays Lab', submitted: true, complete: true },
    { id: 2, name: 'JS Function Lab', submitted: false, complete: false },
    { id: 3, name: 'JS Objects Lab', submitted: true, complete: true },
    { id: 4, name: 'JS Classes Lab', submitted: true, complete: false },
    { id: 5, name: 'Browser Based Game (Project 1)', submitted: true, complete: false }
  ]);

  // Handle checkbox change
  const handleCheckboxChange = (id, field) => {
    const newAssignments = assignments.map((assignment) => {
      if (assignment.id === id) {
        if (field === 'complete') {
          // If marking complete, also mark submitted
          return { ...assignment, submitted: true, complete: !assignment.complete };
        } else if (field === 'submitted') {
          // Prevent unchecking submitted if complete is checked
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
    setAssignments(newAssignments);
  };

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
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.name}</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={assignment.submitted}
                  onChange={() => handleCheckboxChange(assignment.id, 'submitted')}
                  color="primary"
                  // Disable the checkbox interaction if complete is true
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
