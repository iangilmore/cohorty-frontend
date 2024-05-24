// import React, { useState, useEffect } from 'react';
// import { Typography, IconButton, Grid, Container, Box, Modal, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useParams } from 'react-router-dom';
// import { getStudentDetails, updateStudentDetails } from '../../services/students.js'; // Adjust the import according to your folder structure

// function DateItem({ date, onDelete }) {
//   const [showActions, setShowActions] = useState(false);

//   const handleDelete = () => {
//     onDelete();
//   };

//   const toggleActions = () => {
//     setShowActions(!showActions);
//   };

//   return (
//     <ListItem onClick={toggleActions} style={{ cursor: 'pointer', textAlign: 'center' }}>
//       <ListItemText primary={date} />
//       {showActions && (
//         <ListItemSecondaryAction>
//           <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
//             <DeleteIcon />
//           </IconButton>
//         </ListItemSecondaryAction>
//       )}
//     </ListItem>
//   );
// }

// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const formatDateForDisplay = (isoDateString) => {
//   const date = new Date(isoDateString + 'T00:00:00');
//   const monthName = monthNames[date.getMonth()];
//   const day = date.getDate();
//   return `${monthName} ${day}`;
// };

// const formatDateForBackend = (isoDateString) => {
//   const date = new Date(isoDateString + 'T00:00:00');
//   const year = date.getFullYear();
//   const month = ('0' + (date.getMonth() + 1)).slice(-2);
//   const day = ('0' + date.getDate()).slice(-2);
//   return `${year}-${month}-${day}`;
// };

// const sortDates = (dates) => {
//   return dates.sort((a, b) => new Date(a) - new Date(b));
// };

// function Attendance() {
//   const { courseId, studentId } = useParams();
//   const [open, setOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState("");
//   const [newDate, setNewDate] = useState("");
//   const [absences, setAbsences] = useState([]);
//   const [tardies, setTardies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       try {
//         const studentData = await getStudentDetails(courseId, studentId);
//         const formattedAbsences = studentData.attendance.filter(a => a.status === 'Absent').map(a => formatDateForDisplay(a.date));
//         const formattedTardies = studentData.attendance.filter(a => a.status === 'Late').map(a => formatDateForDisplay(a.date));
//         setAbsences(sortDates(formattedAbsences));
//         setTardies(sortDates(formattedTardies));
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentDetails();
//   }, [courseId, studentId]);

//   const handleOpen = (title) => {
//     setOpen(true);
//     setModalTitle(title);
//     setNewDate(""); // Reset the date input when opening the modal
//   };

//   const handleClose = () => setOpen(false);

//   const handleAddDate = async () => {
//     const formattedDate = formatDateForBackend(newDate);
//     let newAttendance = [];

//     if (modalTitle === "Add New Absence") {
//       const updatedAbsences = [...absences, formattedDate];
//       setAbsences(sortDates(updatedAbsences));
//       newAttendance = [
//         ...updatedAbsences.map(date => ({ date: formatDateForBackend(date), status: 'Absent' })),
//         ...tardies.map(date => ({ date: formatDateForBackend(date), status: 'Late' }))
//       ];
//     } else {
//       const updatedTardies = [...tardies, formattedDate];
//       setTardies(sortDates(updatedTardies));
//       newAttendance = [
//         ...absences.map(date => ({ date: formatDateForBackend(date), status: 'Absent' })),
//         ...updatedTardies.map(date => ({ date: formatDateForBackend(date), status: 'Late' }))
//       ];
//     }

//     try {
//       const studentData = await getStudentDetails(courseId, studentId);
//       const existingAttendance = studentData.attendance.map(att => ({
//         date: formatDateForBackend(att.date),
//         status: att.status
//       }));
//       newAttendance = [...existingAttendance, ...newAttendance];

//       await updateStudentDetails(courseId, studentId, { attendance: newAttendance });
//     } catch (error) {
//       setError(error.message);
//     }

//     handleClose();
//   };

//   const handleChangeDate = (event) => {
//     setNewDate(event.target.value);
//   };

//   const handleDelete = async (type, index) => {
//     let updatedList, newAttendance;
//     if (type === "absences") {
//       updatedList = [...absences];
//       updatedList.splice(index, 1);
//       setAbsences(updatedList);
//       newAttendance = [
//         ...updatedList.map(date => ({ date: formatDateForBackend(date), status: 'Absent' })),
//         ...tardies.map(date => ({ date: formatDateForBackend(date), status: 'Late' }))
//       ];
//     } else {
//       updatedList = [...tardies];
//       updatedList.splice(index, 1);
//       setTardies(updatedList);
//       newAttendance = [
//         ...absences.map(date => ({ date: formatDateForBackend(date), status: 'Absent' })),
//         ...updatedList.map(date => ({ date: formatDateForBackend(date), status: 'Late' }))
//       ];
//     }

//     try {
//       const studentData = await getStudentDetails(courseId, studentId);
//       const existingAttendance = studentData.attendance.map(att => ({
//         date: formatDateForBackend(att.date),
//         status: att.status
//       }));
//       newAttendance = [...existingAttendance, ...newAttendance];

//       await updateStudentDetails(courseId, studentId, { attendance: newAttendance });
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: 2,
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <Container maxWidth="sm" sx={{ mt: 2, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <Box sx={{
//         bgcolor: 'pink',
//         width: '100%',
//         p: 2,
//         boxShadow: 3,
//         borderRadius: '4px',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}>
//         <Grid container spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6" gutterBottom align="center">
//               Absences
//             </Typography>
//             <List>
//               {absences.map((date, index) => (
//                 <DateItem key={index} date={date} onDelete={() => handleDelete('absences', index)} />
//               ))}
//             </List>
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//               <IconButton color="primary" size="large" onClick={() => handleOpen("Add New Absence")}>
//                 <AddCircleOutlineIcon />
//               </IconButton>
//             </Box>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6" gutterBottom align="center">
//               Tardies
//             </Typography>
//             <List>
//               {tardies.map((date, index) => (
//                 <DateItem key={index} date={date} onDelete={() => handleDelete('tardies', index)} />
//               ))}
//             </List>
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//               <IconButton color="primary" size="large" onClick={() => handleOpen("Add New Tardy")}>
//                 <AddCircleOutlineIcon />
//               </IconButton>
//             </Box>
//           </Grid>
//         </Grid>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               {modalTitle}
//             </Typography>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="date"
//               label="Date"
//               type="date"
//               value={newDate}
//               onChange={handleChangeDate}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               sx={{ mt: 2 }}
//             />
//             <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
//               <Button variant="contained" onClick={handleClose}>
//                 Cancel
//               </Button>
//               <Button variant="contained" onClick={handleAddDate} color="primary">
//                 Add
//               </Button>
//             </Box>
//           </Box>
//         </Modal>
//       </Box>
//     </Container>
//   );
// }

// export default Attendance;


// import React, { useState, useEffect } from 'react';
// import { Typography, IconButton, Grid, Container, Box, Modal, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useParams } from 'react-router-dom';
// import { getStudentDetails, updateStudentDetails } from '../../services/students.js';

// function DateItem({ date, onDelete }) {
//   const [showActions, setShowActions] = useState(false);

//   const handleDelete = () => {
//     onDelete();
//   };

//   const toggleActions = () => {
//     setShowActions(!showActions);
//   };

//   return (
//     <ListItem onClick={toggleActions} style={{ cursor: 'pointer', textAlign: 'center' }}>
//       <ListItemText primary={date} />
//       {showActions && (
//         <ListItemSecondaryAction>
//           <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
//             <DeleteIcon />
//           </IconButton>
//         </ListItemSecondaryAction>
//       )}
//     </ListItem>
//   );
// }

// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const formatDateForDisplay = (isoDateString) => {
//   const date = new Date(isoDateString + 'T00:00:00');
//   const monthName = monthNames[date.getMonth()];
//   const day = date.getDate();
//   return `${monthName} ${day}`;
// };

// const formatDateForBackend = (isoDateString) => {
//   const date = new Date(isoDateString + 'T00:00:00');
//   const year = date.getFullYear();
//   const month = ('0' + (date.getMonth() + 1)).slice(-2);
//   const day = ('0' + date.getDate()).slice(-2);
//   return `${year}-${month}-${day}`;
// };

// const sortDates = (dates) => {
//   return dates.sort((a, b) => new Date(a) - new Date(b));
// };

// function Attendance() {
//   const { courseId, studentId } = useParams();
//   const [open, setOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState("");
//   const [newDate, setNewDate] = useState("");
//   const [absences, setAbsences] = useState([]);
//   const [tardies, setTardies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       try {
//         const studentData = await getStudentDetails(courseId, studentId);
//         const formattedAbsences = studentData.attendance.filter(a => a.status === 'Absent').map(a => formatDateForDisplay(a.date));
//         const formattedTardies = studentData.attendance.filter(a => a.status === 'Late').map(a => formatDateForDisplay(a.date));
//         setAbsences(sortDates(formattedAbsences));
//         setTardies(sortDates(formattedTardies));
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentDetails();
//   }, [courseId, studentId]);

//   const handleOpen = (title) => {
//     setOpen(true);
//     setModalTitle(title);
//     setNewDate(""); // Reset the date input when opening the modal
//   };

//   const handleClose = () => setOpen(false);

//   const handleAddDate = async () => {
//     const formattedDate = formatDateForBackend(newDate);
//     let newAttendance = [];

//     if (modalTitle === "Add New Absence") {
//       const updatedAbsences = [...absences, formattedDate];
//       setAbsences(sortDates(updatedAbsences));
//       newAttendance = [
//         ...updatedAbsences.map(date => ({ date: formatDateForBackend(date), status: 'Absent' })),
//         ...tardies.map(date => ({ date: formatDateForBackend(date), status: 'Late' }))
//       ];
//     } else {
//       const updatedTardies = [...tardies, formattedDate];
//       setTardies(sortDates(updatedTardies));
//       newAttendance = [
//         ...absences.map(date => ({ date: formatDateForBackend(date), status: 'Absent' })),
//         ...updatedTardies.map(date => ({ date: formatDateForBackend(date), status: 'Late' }))
//       ];
//     }

//     try {
//       const studentData = await getStudentDetails(courseId, studentId);
//       const existingAttendance = studentData.attendance.map(att => ({
//         date: formatDateForBackend(att.date),
//         status: att.status
//       }));
//       newAttendance = [...existingAttendance, ...newAttendance];

//       await updateStudentDetails(courseId, studentId, {
//         attendance: newAttendance,
//         submissions: studentData.submissions // Preserve existing submissions data
//       });
//     } catch (error) {
//       setError(error.message);
//     }

//     handleClose();
//   };

//   const handleChangeDate = (event) => {
//     setNewDate(event.target.value);
//   };

//   const handleDelete = async (type, index) => {
//     let updatedList, newAttendance;
//     if (type === "absences") {
//       updatedList = [...absences];
//       updatedList.splice(index, 1);
//       setAbsences(updatedList);
//       newAttendance = [
//         ...updatedList.map(date => ({ date: formatDateForBackend(date), status: 'Absent' })),
//         ...tardies.map(date => ({ date: formatDateForBackend(date), status: 'Late' }))
//       ];
//     } else {
//       updatedList = [...tardies];
//       updatedList.splice(index, 1);
//       setTardies(updatedList);
//       newAttendance = [
//         ...absences.map(date => ({ date: formatDateForBackend(date), status: 'Absent' })),
//         ...updatedList.map(date => ({ date: formatDateForBackend(date), status: 'Late' }))
//       ];
//     }

//     try {
//       const studentData = await getStudentDetails(courseId, studentId);
//       const existingAttendance = studentData.attendance.map(att => ({
//         date: formatDateForBackend(att.date),
//         status: att.status
//       }));
//       newAttendance = [...existingAttendance, ...newAttendance];

//       await updateStudentDetails(courseId, studentId, {
//         attendance: newAttendance,
//         submissions: studentData.submissions // Preserve existing submissions data
//       });
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: 2,
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <Container maxWidth="sm" sx={{ mt: 2, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <Box sx={{
//         bgcolor: 'pink',
//         width: '100%',
//         p: 2,
//         boxShadow: 3,
//         borderRadius: '4px',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}>
//         <Grid container spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6" gutterBottom align="center">
//               Absences
//             </Typography>
//             <List>
//               {absences.map((date, index) => (
//                 <DateItem key={index} date={date} onDelete={() => handleDelete('absences', index)} />
//               ))}
//             </List>
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//               <IconButton color="primary" size="large" onClick={() => handleOpen("Add New Absence")}>
//                 <AddCircleOutlineIcon />
//               </IconButton>
//             </Box>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6" gutterBottom align="center">
//               Tardies
//             </Typography>
//             <List>
//               {tardies.map((date, index) => (
//                 <DateItem key={index} date={date} onDelete={() => handleDelete('tardies', index)} />
//               ))}
//             </List            >
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//               <IconButton color="primary" size="large" onClick={() => handleOpen("Add New Tardy")}>
//                 <AddCircleOutlineIcon />
//               </IconButton>
//             </Box>
//           </Grid>
//         </Grid>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               {modalTitle}
//             </Typography>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="date"
//               label="Date"
//               type="date"
//               value={newDate}
//               onChange={handleChangeDate}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               sx={{ mt: 2 }}
//             />
//             <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
//               <Button variant="contained" onClick={handleClose}>
//                 Cancel
//               </Button>
//               <Button variant="contained" onClick={handleAddDate} color="primary">
//                 Add
//               </Button>
//             </Box>
//           </Box>
//         </Modal>
//       </Box>
//     </Container>
//   );
// }

// export default Attendance;

import React, { useState, useEffect } from 'react';
import { Typography, IconButton, Grid, Container, Box, Modal, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { getStudentDetails, updateStudentDetails } from '../../services/students.js';

function DateItem({ date, onDelete }) {
  const [showActions, setShowActions] = useState(false);

  const handleDelete = () => {
    onDelete();
  };

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  return (
    <ListItem onClick={toggleActions} style={{ cursor: 'pointer', textAlign: 'center' }}>
      <ListItemText primary={date} />
      {showActions && (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const formatDateForDisplay = (isoDateString) => {
  const date = new Date(isoDateString + 'T00:00:00');
  const monthName = monthNames[date.getMonth()];
  const day = date.getDate();
  return `${monthName} ${day}`;
};

const formatDateForBackend = (isoDateString) => {
  const date = new Date(isoDateString + 'T00:00:00');
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const sortDates = (dates) => {
  return dates.sort((a, b) => new Date(a) - new Date(b));
};

function Attendance() {
  const { courseId, studentId } = useParams();
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [absences, setAbsences] = useState([]);
  const [tardies, setTardies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const studentData = await getStudentDetails(courseId, studentId);
        const formattedAbsences = studentData.attendance.filter(a => a.status === 'Absent').map(a => formatDateForDisplay(a.date));
        const formattedTardies = studentData.attendance.filter(a => a.status === 'Late').map(a => formatDateForDisplay(a.date));
        setAbsences(sortDates(formattedAbsences));
        setTardies(sortDates(formattedTardies));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [courseId, studentId]);

  const handleOpen = (title) => {
    setOpen(true);
    setModalTitle(title);
    setNewDate(""); // Reset the date input when opening the modal
  };

  const handleClose = () => setOpen(false);

  const handleAddDate = async () => {
    const formattedDate = formatDateForBackend(newDate);
    let newAttendance = [];

    if (modalTitle === "Add New Absence") {
      const updatedAbsences = [...absences, formattedDate];
      setAbsences(sortDates(updatedAbsences));
      newAttendance = [
        ...updatedAbsences.map(date => ({ date: formatDateForBackend(date), status: 'Absent' })),
        ...tardies.map(date => ({ date: formatDateForBackend(date), status: 'Late' }))
      ];
    } else {
      const updatedTardies = [...tardies, formattedDate];
      setTardies(sortDates(updatedTardies));
      newAttendance = [
        ...absences.map(date => ({ date: formatDateForBackend(date), status: 'Absent' })),
        ...updatedTardies.map(date => ({ date: formatDateForBackend(date), status: 'Late' }))
      ];
    }

    try {
      const studentData = await getStudentDetails(courseId, studentId);
      const existingAttendance = studentData.attendance.map(att => ({
        date: formatDateForBackend(att.date),
        status: att.status
      }));
      newAttendance = [...existingAttendance, ...newAttendance];

      await updateStudentDetails(courseId, studentId, {
        attendance: newAttendance,
        submissions: studentData.submissions // Preserve existing submissions data
      });
    } catch (error) {
      setError(error.message);
    }

    handleClose();
  };

  const handleChangeDate = (event) => {
    setNewDate(event.target.value);
  };

  const handleDelete = async (type, index) => {
    let updatedList, newAttendance;
    if (type === "absences") {
      updatedList = [...absences];
      updatedList.splice(index, 1);
      setAbsences(updatedList);
      newAttendance = [
        ...updatedList.map(date => ({ date: formatDateForBackend(date), status: 'Absent' })),
        ...tardies.map(date => ({ date: formatDateForBackend(date), status: 'Late' }))
      ];
    } else {
      updatedList = [...tardies];
      updatedList.splice(index, 1);
      setTardies(updatedList);
      newAttendance = [
        ...absences.map(date => ({ date: formatDateForBackend(date), status: 'Absent' })),
        ...updatedList.map(date => ({ date: formatDateForBackend(date), status: 'Late' }))
      ];
    }

    try {
      const studentData = await getStudentDetails(courseId, studentId);
      const existingAttendance = studentData.attendance.map(att => ({
        date: formatDateForBackend(att.date),
        status: att.status
      }));
      newAttendance = [...existingAttendance, ...newAttendance];

      await updateStudentDetails(courseId, studentId, {
        attendance: newAttendance,
        submissions: studentData.submissions // Preserve existing submissions data
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container maxWidth="sm" sx={{ mt: 2, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '430px' }}>
      <Box sx={{
        bgcolor: 'pink',
        width: '100%',
        p: 2,
        boxShadow: 3,
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Grid container spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="center">
              Absences
            </Typography>
            <List>
              {absences.map((date, index) => (
                <DateItem key={index} date={date} onDelete={() => handleDelete('absences', index)} />
              ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton color="primary" size="large" onClick={() => handleOpen("Add New Absence")}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="center">
              Tardies
            </Typography>
            <List>
              {tardies.map((date, index) => (
                <DateItem key={index} date={date} onDelete={() => handleDelete('tardies', index)} />
              ))}
            </List            >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton color="primary" size="large" onClick={() => handleOpen("Add New Tardy")}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalTitle}
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="date"
              label="Date"
              type="date"
              value={newDate}
              onChange={handleChangeDate}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mt: 2 }}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleAddDate} color="primary">
                Add
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default Attendance;