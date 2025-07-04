import { useState } from "react";
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

function Signup() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { firstname, lastname, email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    console.log(`${name} , ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      console.log(data);
      const { success, message } = data;
      if (success) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
        console.log(message);
      }
    } catch (e) {
      console.log(e);
    }
    setInputValue({
      ...inputValue,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          Create your Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            type="text"
            label="FirstName"
            fullWidth
            margin="normal"
            name="firstname"
            value={firstname}
            onChange={handleOnChange}
            required
          ></TextField>
          <TextField
            type="text"
            label="LastName"
            fullWidth
            margin="normal"
            name="lastname"
            value={lastname}
            onChange={handleOnChange}
            required
          ></TextField>
          <TextField
            type="email"
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={email}
            onChange={handleOnChange}
            required
          ></TextField>
          <TextField
            type="password"
            label="Password"
            fullWidth
            margin="normal"
            name="password"
            value={password}
            onChange={handleOnChange}
            required
          ></TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
          >
            SignUp
          </Button>
        </Box>
        <Typography variant="body2" align="flex-start" sx={{ mt: 2 }}>
          Already have an account?
          <Link to="/login" style={{ textDecoration: "none" }}>
            &nbsp; Login here
          </Link>
        </Typography>
        <Typography variant="body2" align="flex-end" sx={{ mt: 2 }}>
          forgot your password
          <Link to="/forgotCredentials" style={{ textDecoration: "none" }}>
            &nbsp; click here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Signup;
