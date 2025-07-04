import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";

function ResetPass() {
  const { token } = useParams();
  const [valid, setValid] = useState(false);
  const [currTokenUser, setCurrTokenUser] = useState('');
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    password: "",
    con_password: "",
  });
  const { password, con_password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/verify-reset/${token}`);
        console.log(res);
        setValid(res.data.valid);
        setCurrTokenUser(res.data.email);
      } catch {
        setValid(false);
      }
    };
    checkToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== con_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/reset-password/${token}`, {
        password,
        con_password,
        currTokenUser
      });
      const { message } = res.data;
      alert(message || "Password reset successful");

      setTimeout(() => navigate("/login"), 1500);
    } catch (e) {
      console.log(e);
      alert("Something went wrong. Try again.");
    }

    setInputValue({ password: "", con_password: "" });
  };

  if (!valid) return <p>Reset link is invalid or expired.</p>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          Reset your Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
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
          <TextField
            margin="normal"
            fullWidth
            label="Confirm Password"
            name="con_password"
            type="password"
            value={con_password}
            onChange={handleOnChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
          >
            Reset your Password
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              SignUp here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default ResetPass;
