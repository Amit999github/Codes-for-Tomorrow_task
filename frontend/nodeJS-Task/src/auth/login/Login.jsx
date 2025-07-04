import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:3000/login",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data.data;
      if (success) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch(e){
        console.log(e)
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login to Your Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleOnChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleOnChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
          >
            Login
          </Button>
          <Typography variant="body2" align="flex-start" sx={{ mt: 2 }}>
            Don't have an account?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              &nbsp; SignUp here
            </Link>
          </Typography>
          <Typography variant="body2" align="flex-end" sx={{ mt: 2 }}>
            forgot your password 
            <Link to="/forgotCredentials" style={{ textDecoration: "none" }}>
               &nbsp; click here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
