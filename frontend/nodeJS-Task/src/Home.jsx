import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
function Home() {
  const navigate = useNavigate();
  const [cookies,setCookie, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:3000",
        {},
        { withCredentials: true }
      );
      const { user } = data;
      setUsername(user);
    };
    verifyCookie();
  }, [cookies, navigate]);
  function Logout(){
    removeCookie("token");
    navigate("/login");
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {username}
          </Typography>
          <Button color="inherit" onClick={Logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Hello, {username}!
          </Typography>
          <Typography variant="body1">Developed By Amit Athiya</Typography>
          <Typography variant="body1">Must visit these pages</Typography>
          <Typography variant="body1">
            <a href="https://github.com/Amit999github">
              <GitHubIcon />
              Github
            </a>
          </Typography>
          <Typography variant="body1">
            <a href="https://www.linkedin.com/in/amit-athiya-b7ba0b229/">
              <LinkedInIcon />
              Linkdin
            </a>
          </Typography>
          <Typography variant="body1">
            <a href="https://amit-athiya-portfolio.netlify.app/">
              <PersonIcon />
              Portfolio
            </a>
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default Home;
