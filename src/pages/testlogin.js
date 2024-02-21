



import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/system";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Checkbox,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/layout";
import "../assets/login.css";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
 
  
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    console.log("Visibility button clicked");
    setPasswordVisible(!passwordVisible);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      login(event);
    }
  };
  useEffect(() => {
    const storedCredentials = localStorage.getItem("user-credentials");
    if (storedCredentials) {
      const { username, password } = JSON.parse(storedCredentials);
      setUsername(username);
      setPassword(password);
    }
  }, []);

  const login = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (!username || !password) {
      setErrorMessage("İstifadəçi adı və şifrəni daxil edin");
      return;
    }

    setLoading(true);
    let item = { username, password };

    try {
      let response = await fetch(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (response.status === 401) {
        setErrorMessage(
          "Yanlış istifadəçi adı və ya şifrə. Zəhmət olmasa bir daha cəhd edin"
        );
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        let result = await response.json();

        if (rememberMe) {
          localStorage.setItem(
            "user-credentials",
            JSON.stringify({ username, password })
          );
        } else {
          localStorage.removeItem("user-credentials");
        }

        localStorage.setItem("user-info", JSON.stringify(result));
        window.location.href = "/profile";
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="login-container"
       
      >
        <Grid item xs={10} sm={10} md={10} lg={4} xl={4}>
          <Paper elevation={3} className="login-frame">
            <Typography
              variant="h4"
              component="h4"
              className="login-heading"
              style={{
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(3),
              }}
            >
              Daxil ol
            </Typography>
            <form
              className="loginForm"
              onSubmit={login}
              onKeyDown={handleKeyDown}
            >
              {/* <Grid item xs={12} className="mb-4"> */}
              <TextField
                className="mb-4"
                label="İstifadəçi adı"
                variant="outlined"
                InputProps={{ style: { color: "#2b2676" } }}
                // Assuming you have a state variable for username
                value={username}
                sx={{ width: "100%", "& fieldset": { borderColor: "#2b2676" } }}
                onChange={(e) => setUsername(e.target.value)}
                // placeholder="sample@jestdili.az"
                // InputLabelProps={{ shrink: true }}
              />
              {/* </Grid> */}

              {/* <Grid item xs={12} className="mb-4"> */}
              <TextField
                className="mb-4"
                label="Şifrə"
                variant="outlined"
                type={passwordVisible ? "text" : "password"}
                // Assuming you have a state variable for password
                value={password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "100%", "& fieldset": { borderColor: "#2b2676" } }}
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* </Grid> */}
              {errorMessage && (
                <Typography color="error" className="error-message">
                  {errorMessage}
                </Typography>
              )}
              <Button
                onClick={login}
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: 46 }}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={24} /> : null}
              >
                {loading ? "Daxil olunur..." : "Daxil ol"}
              </Button>
            </form>
            <div className="login-checkbox-row">
              <Grid container alignItems="center" className="login-check">
                <Grid item>
                  <Checkbox
                    className="login-rememberCheckbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </Grid>

                <Grid item>
                  <Typography variant="body1" className="login-term">
                    Məni xatırla
                  </Typography>
                </Grid>
              </Grid>

              <Typography className="forgot-password">
                Şifrəni unutmusan?
              </Typography>
            </div>

            <hr />
            <Typography className="mb-4">Ya da</Typography>
            <Typography className="forgot-password">
              <Link to="/signup">Yeni istifadəçisən?</Link>
              <Link to="/signup">Qeydiyyatdan keç</Link>
            </Typography>
          </Paper>
        </Grid>
        
      </Grid>
    </Layout>
  );
};

export default LogIn;
