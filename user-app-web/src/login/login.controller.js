import * as React from "react";
import { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { loginService } from "./login.service";
import { useNavigate } from "react-router-dom";


const defaultTheme = createTheme();

export function LoginPage() {
  const navigate = useNavigate();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const onLoginSubmit = (e) => {  

    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userInfo = {
      username: data.get("username"),
      password: data.get("password"),
    };

    loginService(userInfo)
      .then((e) => {
        console.log('login', e);
        localStorage.setItem('auth', JSON.stringify(e));
        navigate('/');
      })
      .catch(() => setShowErrorMessage(true));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          {
            showErrorMessage && (
              <Typography component="h6" variant="h6" color={"red"}>
                ¡Error! Usuario o contraseña incorrectos.
              </Typography>
          )}
          <Box
            component="form"
            onSubmit={onLoginSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username Address"
              name="username"
              autoComplete="username"
              autoFocus
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/create-user" variant="body2">
                  {"Si no tienes una cuenta, Registrarse"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
