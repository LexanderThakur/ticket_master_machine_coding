import { useState, useEffect } from "react";

import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import axios from "axios";
const api = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handle_login() {
    if (!email.trim() || !password.trim()) {
      alert("empty fields");
      return;
    }
    try {
      const response = await axios.post(api + "/auth/login/", {
        username: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("token", response.data.access);
      console.log(localStorage.getItem("token"));
      navigate("/");
    } catch (error) {
      if (error.response?.status == 401) {
        alert("invalid credentials");
      }
    }
  }

  async function handle_register() {
    if (!email.trim() || !password.trim()) {
      alert("empty fields");
      return;
    }

    try {
      const response = await axios.post(api + "/auth/register/", {
        username: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("token", response.data.access);
      console.log(localStorage.getItem("token"));
      navigate("/");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          height: "30%",
          width: "30%",
          gap: 2,
          border: "1px solid black ",
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Typography>Login or Signup</Typography>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>

        <Stack direction={"row"} spacing={1}>
          <Button variant="outlined" onClick={() => handle_login()}>
            Login
          </Button>
          <Button variant="outlined" onClick={() => handle_register()}>
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
