import { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Stack } from '@mui/material';
import { login } from '../utils/api'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await login(credentials);
      const token = response.token;
      localStorage.setItem('authToken', token);
      setAuth(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed!');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1E2A78, #15192F)',
      }}
    >
      {/* Background Animation */}
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
            width: '400px',
            height: '400px',
            background: 'rgba(58, 123, 213, 0.8)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            animation: 'moveBubble 8s infinite alternate',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'rgba(0, 210, 255, 0.6)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            animation: 'moveBubble 10s infinite alternate-reverse',
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
              color: 'rgba(0, 50, 200, 0.9)',
              textShadow: '0 3px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please log in to continue
          </Typography>
        </Stack>

        <TextField
          label="Email"
          name="email"
          value={credentials.email}
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
          value={credentials.password}
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
            background: 'linear-gradient(90deg, #3A7BD5, #00D2FF)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(90deg, #3A7BD5, #4ECDC4)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            },
          }}
          onClick={handleLogin}
        >
          Log In
        </Button>

        <Typography
          mt={3}
          textAlign="center"
          color="text.secondary"
          sx={{
            fontSize: '0.9rem',
          }}
        >
          Don't have an account?{' '}
          <Link
            href="/signup"
            underline="hover"
            sx={{
              fontWeight: 'bold',
              color: '#3A7BD5',
              '&:hover': { color: '#00D2FF' },
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>

      <style>
        {`
          @keyframes moveBubble {
            0% { transform: translate(-50px, -50px); }
            100% { transform: translate(50px, 50px); }
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

export default Login;
