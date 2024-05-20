import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, Box } from '@mui/material';

function SingleAssignmentGrid() {
    const [students, setStudents] = useState([
        { id: 1, name: 'Ian Gilmore', submitted: true, complete: true },
        { id: 2, name: 'Addy Jaime', submitted: false, complete: true },
        { id: 3, name: 'Joshua Pierre', submitted: true, complete: true },
        { id: 4, name: 'Elton John', submitted: false, complete: false },
        { id: 5, name: 'Abel Tesfaye', submitted: true, complete: false },
        { id: 6, name: 'Alexa Clark', submitted: true, complete: true },
    ]);

    // Toggle checkbox for submitted or complete
    const handleCheckboxChange = (id, field) => {
        const newStudents = students.map(student => {
            if (student.id === id) {
                return { ...student, [field]: !student[field] };
            }
            return student;
        });
        setStudents(newStudents);
    };

    return (
        <Box sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: 800, width: '100%', bgcolor: 'background.paper', p: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                    JS Arrays Lab
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 4, textAlign: 'center' }}>
                    due April 2, 2024
                </Typography>
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Submitted</TableCell>
                                <TableCell align="center">Complete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell align="center">
                                        <Checkbox 
                                            checked={student.submitted} 
                                            onChange={() => handleCheckboxChange(student.id, 'submitted')}
                                            color="primary" 
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Checkbox 
                                            checked={student.complete} 
                                            onChange={() => handleCheckboxChange(student.id, 'complete')}
                                            color="primary" 
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

export default SingleAssignmentGrid;
