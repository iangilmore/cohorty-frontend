import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  Box
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../services/courses.js';
import { getAssignmentDetails, updateAssignmentDetails } from '../../services/assignments.js';

export default function SingleAssignmentGrid() {
  const { courseId, assignmentId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [assignmentData, setAssignmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentsAndAssignments = async () => {
      try {
        const courseDataArray = await getCourse(courseId);
        const assignmentDetails = await getAssignmentDetails(courseId, assignmentId);
        const courseData = courseDataArray.find(course => course.id.toString() === courseId);
        if (!courseData) {
          throw new Error("Course not found");
        }
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

  const handleCheckboxChange = async (studentId, field) => {
    const updatedAssignments = assignments.map(assignment => {
      if (assignment.id === studentId) {
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

    const updatedAssignment = updatedAssignments.find(assignment => assignment.id === studentId);
    const isComplete = updatedAssignment.complete;

    let updatedSubmissions = [...assignmentData.submissions];
    const existingSubmission = updatedSubmissions.find(sub => sub.student === studentId);

    if (existingSubmission) {
      existingSubmission.is_complete = isComplete;
    } else {
      updatedSubmissions.push({
        id: Math.floor(Math.random() * 1000000), // Use a better ID generation strategy in real scenarios
        student: studentId,
        is_complete: isComplete,
        assignment: Number(assignmentId) // Ensure assignment ID is a number
      });
    }

    console.log("Updated submissions:", updatedSubmissions);

    const updatedAssignmentData = {
      ...assignmentData,
      submissions: updatedSubmissions
    };

    console.log("Updated assignment data before API call:", updatedAssignmentData);

    setAssignmentData(updatedAssignmentData);

    try {
      const response = await updateAssignmentDetails(courseId, assignmentId, updatedAssignmentData);
      console.log("Response from updateAssignmentDetails API:", response);

      // Verify that the response data includes the updated submissions
      if (response.submissions.length !== updatedAssignmentData.submissions.length) {
        console.warn("Mismatch in submissions length. API might not be updating correctly.");
      }
    } catch (error) {
      console.error("Error updating assignment details:", error);
      setError("Failed to update assignment details.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ minWidth: 500, mx: "auto", bgcolor: 'background.paper', p: 4, boxShadow: 3, borderRadius: 2 }}>
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
        <TableContainer sx={{ maxWidth: 650, mx: "auto" }}>
          <Table sx={{ '& .MuiTableRow-root': { borderBottom: '2px solid #FFF' } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white', bgcolor: 'text.secondary' }}>Name</TableCell>
                <TableCell sx={{ color: 'white', bgcolor: 'text.secondary' }}align="center">Submitted</TableCell>
                <TableCell sx={{ color: 'white', bgcolor: 'text.secondary' }}align="center">Complete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id} sx={{ bgcolor: assignment.complete ? '#c8e6c9' : assignment.submitted ? '#ffecb3' : '#ffcdd2' }}>
                  <TableCell>{assignment.name}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={assignment.submitted}
                      onChange={() => handleCheckboxChange(assignment.id, 'submitted')}
                      color="primary"
                      disabled={assignment.complete}
                      sx={{ padding: 0 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={assignment.complete}
                      onChange={() => handleCheckboxChange(assignment.id, 'complete')}
                      color="primary"
                      sx={{ padding: 0 }}
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
