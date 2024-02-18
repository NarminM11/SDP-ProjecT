import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/system";

// import { useNavigate } from 'react-router-dom';
// import { Row, Col, Form, Input, Button, Checkbox, message } from "antd";
import {
  Button,
  Checkbox,
  TextField,
  Grid,
  Container,
  Typography,
} from "@mui/material";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
// import { LoadingOutlined } from "@ant-design/icons";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import "../assets/signUp.css";
import Layout from "../components/Layout/layout";
const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const theme = useTheme();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const validatePassword = (value) => {
    let error = "";
    if (!value.trim()) {
      error = "Şifrə tələb olunur.";
    } else if (!passwordRegex.test(value)) {
      error =
        "Şifrəniz ən azı 8 simvol uzunluğunda olmalıdır, ən azı bir böyük hərf daxil edin";
    }
    setPasswordError(error);
    return error;
  };

  useEffect(() => {
    if (passwordError) {
      return;
    }
  }, [passwordError]);

  async function signUp(event) {
    try {
      event.preventDefault();

      if (!name || !username || !email || !password || !confirm_password) {
        setMessage("Zəhmət olmasa bütün tələb olunan sahələri doldurun.");
        return;
      }

      const isPasswordRequired = true;

      let item = { name, username, email, password, confirm_password };
      console.log("Payload being sent:", item);

      validatePassword(password);

      let result = await axios.post(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/register",
        item,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const token = result.data.access_token;

      if (token) {
        localStorage.setItem("user-token", token);
      }

      setMessage("Qeydiyyat uğurlu oldu!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response) {
        console.log("Server response:", error.response.data);

        if (error.response.data.message.includes("username")) {
          setMessage(
            "İstifadəçi adı artıq istifadə olunur. Fərqli birini seçin."
          );
        } else if (error.response.data.message.includes("email")) {
          setMessage(
            "E-poçt artıq qeydiyyatdan keçib. Fərqli istifadə edin və ya daxil olun."
          );
        } else {
          setMessage("An error occurred during registration.");
        }

        if (
          error.response.data.message.includes("Password") ||
          error.response.data.message.includes("parol")
        ) {
          setPasswordError(
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
          );
        } else {
          setPasswordError("");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="signUp-container d-flex align-items-center justify-content-center">
        <form onSubmit={signUp}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className="signUp-frame mt-5"
          >
            <Grid item xs={12} className="sign-heading">
              <Typography
                variant="h4"
                style={{
                  marginTop: theme.spacing(3),
                  marginBottom: theme.spacing(3),
                }}
              >
                Qeydiyyatdan keç
              </Typography>
            </Grid>

            <Grid item xs={12} className="mb-4">
              <TextField
                className="signUp-text-input"
                label="Ad Soyad"
                variant="outlined"
                sx={{ width: "100%", "& fieldset": { borderColor: "#2b2676" } }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} className="mb-4">
              <TextField
                className="signUp-text-input"
                label="İstifadəçi adı"
                variant="outlined"
                InputProps={{ style: { color: "#2b2676" } }}
                sx={{ width: "100%", "& fieldset": { borderColor: "#2b2676" } }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} className="mb-4">
              <TextField
                className="signUp-text-input"
                label="Epoçt adressi"
                variant="outlined"
                sx={{ width: "100%", "& fieldset": { borderColor: "#2b2676" } }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} className="mb-4">
              <TextField
                className="signUp-text-input"
                label="Şifrə"
                variant="outlined"
                sx={{ width: "100%", "& fieldset": { borderColor: "#2b2676" } }}
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        style={{ color: "#2b2676" }}
                      >
                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {passwordError && (
                <div className="signUp-error-message">
                  <p>{passwordError}</p>
                </div>
              )}
            </Grid>

            <Grid item xs={12} className="mb-4">
              <TextField
                className="signUp-text-input"
                label="Şifrəni Təsdiqləyin"
                variant="outlined"
                sx={{ width: "100%", "& fieldset": { borderColor: "#2b2676" } }}
                type="password"
                value={confirm_password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        style={{ color: "#2b2676" }}
                      >
                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid container alignItems="center" className="check">
              <Grid item>
                <Checkbox
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  style={{ color: "#2b2676" }}
                />
              </Grid>
              <Grid item>
                <Typography variant="body1" className="signUp-term">
                  Mən Qaydalar və Şərtlərlə razıyam!
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              {message && (
                <div className="signUp-error-message">
                  <p>{message}</p>
                </div>
              )}
            </Grid>

            <Grid item xs={12} className="sign-button">
              <Button
                div
                type="submit"
                className="signUp-button"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Qeydiyyatdan keçilir..." : "Qeydiyyatdan keç"}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <a href="/login" className="signUp-user">
                  Artıq hesabınız var? Daxil olun!
                </a>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
