import { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Stack } from '@mui/material';
import { signup } from '../utils/api'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    try {
      console.log('formData :: ', formData);
      await signup(formData);
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed!');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
      }}
    >
      {/* Animated Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: 'rgba(0, 190, 255, 0.8)',
            borderRadius: '50%',
            filter: 'blur(150px)',
            animation: 'moveBubble 9s infinite alternate',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '350px',
            height: '350px',
            background: 'rgba(255, 80, 80, 0.6)',
            borderRadius: '50%',
            filter: 'blur(120px)',
            animation: 'moveBubble 11s infinite alternate-reverse',
          },
        }}
      />

      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          margin: 'auto',
          mt: 12,
          p: 4,
          borderRadius: 5,
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.8), rgba(240,240,255,0.9))',
          backdropFilter: 'blur(8px)',
          animation: 'fadeIn 1.5s ease-in-out',
        }}
      >
        <Stack alignItems="center" spacing={2} mb={3}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#203A43',
              textShadow: '0 3px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign up to get started
          </Typography>
        </Stack>

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: 3,
            },
          }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: 3,
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: 3,
            },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 'bold',
            fontSize: '1rem',
            background: 'linear-gradient(90deg, #1E9600, #FFF200, #FF0000)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(90deg, #FF8008, #FFC837)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            },
          }}
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <Typography
          mt={3}
          textAlign="center"
          color="text.secondary"
          sx={{
            fontSize: '0.9rem',
          }}
        >
          Already have an account?{' '}
          <Link
            href="/login"
            underline="hover"
            sx={{
              fontWeight: 'bold',
              color: '#3A7BD5',
              '&:hover': { color: '#00D2FF' },
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>

      <style>
        {`
          @keyframes moveBubble {
            0% { transform: translate(-80px, -80px); }
            100% { transform: translate(80px, 80px); }
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default Signup;
