import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';

export default function StudentTable() {
  const rows = [
    { name: 'Ian Gilmore', assignment: '100%', absences: 0 },
    { name: 'Addy Jaime', assignment: '100%', absences: 0 },
    { name: 'Joshua Pierre', assignment: '100%', absences: 0 },
    { name: 'Elton John', assignment: '50%', absences: 2 },
    { name: 'Abel Tesfaye', assignment: '75%', absences: 1.33 },
    { name: 'Alexa Clark', assignment: '100%', absences: 0 }
  ];

  // Function to handle click event on student name
  const handleNameClick = (name) => {
    console.log("Clicked on: ", name);
    // Here you can define actions like opening a modal, displaying details, etc.
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <TableContainer component={Paper} sx={{ maxWidth: 650, mx: "auto" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Student</TableCell>
              <TableCell align="right" sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Assignment %</TableCell>
              <TableCell align="right" sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 100 }}>Absences</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {/* Wrap student name in a Button for clickable functionality */}
                  <Button
                    onClick={() => handleNameClick(row.name)}
                    sx={{ textTransform: 'none', justifyContent: 'flex-start', color: 'inherit', padding: 0, minWidth: 'auto' }} // Minimal button styling
                  >
                    {row.name}
                  </Button>
                </TableCell>
                <TableCell align="right">{row.assignment}</TableCell>
                <TableCell align="right">{row.absences}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
