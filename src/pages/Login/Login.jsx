import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from "../../assets/cohortyLogo.png";
import { logIn } from '../../services/users'; // Assuming logIn is the correct function

export default function LogIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    isError: false,
    errorMsg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = await logIn(form); // Assuming logIn is the function to authenticate
      // Assuming setUser is a context or state function to set the logged-in user
      // setUser(userData);

      navigate("/courses");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        ...prevForm,
        isError: true,
        errorMsg: "Invalid Credentials",
        password: "",
      }));
    }
  };

  const renderError = () => {
    if (form.isError) {
      return (
        <Typography color="error" variant="body2">
          {form.errorMsg}
        </Typography>
      );
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: 'url(https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Ensures the form is centered vertically
        alignItems: 'center' // Ensures the form is centered horizontally
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            bgcolor: 'white',
            p: 3,
            borderRadius: 4,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Centers everything inside this box
            width: '100%', // Ensures the container fits to the maxWidth set by the Container
          }}
        >
          <img src={Logo} alt="Logo" style={{ width: '300px', height: 'auto' }} />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username" // Changed to match the state
              autoComplete="email"
              autoFocus
              value={form.username} // Controlled component
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={form.password} // Controlled component
              onChange={handleChange}
            />
            {renderError()}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
