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
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Forgot() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:3000/pass-reset-link",
        { email: inputValue },
        { withCredentials: true }
      );
      const { success, message } = data.data;
      toast.success(message, {
        position: "top-left",
      });

    } catch (e) {
      console.log(e);
    }
    setInputValue("");
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          Forgot Your Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate >
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={inputValue}
            onChange={handleOnChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
          >
            Submit
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              &nbsp; SignUp here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Forgot;
