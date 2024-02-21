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

const LoginForm = () => {
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
      <div>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          {/* <Grid item xs={10} sm={8} md={6} lg={4} xl={4}> */}
            <div className="login_container">
              <div className="login_screen">
                <div className="login_screen__content">
                  <form className="login">
                    {/* <h1 style={{ textAlign: "center", color: "blue"}} className="login-heading">Daxil Ol</h1> */}

                    <div className="login__field">
                      <TextField
                        // className="mb-4"
                        label="İstifadəçi adı"
                        variant="outlined"
                        InputProps={{ style: { color: "#2b2676" } }}
                        value={username}
                        InputLabelProps={{
                          style: { color: "#2b2676" } // Set the color of the label here
                        }}
                        sx={{
                          width: "75%"                        }}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="login__field">
                      <TextField
                        // className="mb-4"
                        label="Şifrə"
                        variant="outlined"
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        sx={{
                          width: "75%"
                                                }}
                        InputLabelProps={{
                          style: { color: "#2b2676" } // Set the color of the label here
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={togglePasswordVisibility}
                                edge="end"
                                sx={{
                                  width: "75%",
                                  color: "#2b2676",
                                }}
                              >
                                {passwordVisible ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        // sx={{
                        //   width: "75%",
                        //   color: "#2b2676",
                        // }}
                        margin="normal"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {/* </Grid> */}
                      {errorMessage && (
                        <Typography color="error" className="error-message">
                          {errorMessage}
                        </Typography>
                      )}
                    </div>
                    {/* <button class="button login__submit">
          <span class="button__text">Log In Now</span>
          <i class="button__icon fas fa-chevron-right"></i>
        </button> 	 */}
        <div 
        className="
        d-flex flex-direction-column align-items-center justify-content-center
        "
>
                    <button
                      className="button login__submit "
                      onClick={login}
                      variant="contained"
                      color="primary"
                      // size="large"
                      style={{
                        // marginLeft: 90,
                        marginTop: 46,
                        // color: "white",
                        // width: "30%",
                        background: "linear-gradient(90deg, rgba(3,3,47,1) 0%, rgba(214,213,224,1) 0%, rgba(17,8,103,1) 24%, rgba(9,7,50,1) 88%, rgba(241,246,247,1) 100%)",
                      }}
                      disabled={loading}
                      startIcon={
                        loading ? (
                          <CircularProgress
                            size={24}
                            className="button__text"
                          />
                        ) : null
                      }
                    >
                      {loading ? "Daxil olunur..." : "Daxil ol"}
                      <i
                        class="button__icon fas fa-chevron-right"
                        style={{ color: "white", }}
                      ></i>
                    </button>
                    </div>
                  </form>
                  <div className="login-checkbox-row">
                    <Grid container alignItems="center" className="login-check">
                      <Grid item>
                        <Checkbox
                          className="login-rememberCheckbox"
                          checked={rememberMe}
                       style={{ color: "white", }}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          className="login-term"
                        //   style={{ marginTop: "110px", 
                        //   // fontSize:"18" 
                        // }}
                        >
                          Məni xatırla
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      className="forgot-password"
                      // style={{ marginTop: "10px" }}
                    >
                      Şifrəni unutmusan?
                    </Typography>
                  </div>
                  <hr />
                  <Typography className="mb-2">Ya da</Typography>
                  <Typography className="new-user">
                    <Link to="/signup" style={{ color: "white" }}>
                      Yeni istifadəçisiniz? Qeydiyyatdan keç
                    </Link>
                    {/* <Link to="/signup" style={{ color: "white" }}>
                    Qeydiyyatdan keç
                  </Link> */}
                  </Typography>
                </div>
                <div className="screen__background">
                  <span className="screen__background__shape screen__background__shape4"></span>
                  <span className="screen__background__shape screen__background__shape3"></span>
                  <span className="screen__background__shape screen__background__shape2"></span>
                  <span className="screen__background__shape screen__background__shape6"></span>
                </div>
              </div>
            </div>
          </Grid>
        {/* </Grid> */}
      </div>
    </Layout>
  );
};

export default LoginForm;

// import React, { useEffect, useState } from "react";
// import { useTheme } from "@mui/system";
// import { InputAdornment, IconButton } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import {
//   Grid,
//   Paper,
//   TextField,
//   Button,
//   Checkbox,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import Layout from "../components/Layout/layout";
// import "../assets/login.css";

// const LogIn = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const theme = useTheme();

//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     console.log("Visibility button clicked");
//     setPasswordVisible(!passwordVisible);
//   };
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       login(event);
//     }
//   };
//   useEffect(() => {
//     const storedCredentials = localStorage.getItem("user-credentials");
//     if (storedCredentials) {
//       const { username, password } = JSON.parse(storedCredentials);
//       setUsername(username);
//       setPassword(password);
//     }
//   }, []);

//   const login = async (event) => {
//     event.preventDefault(); // Prevent default form submission behavior
//     if (!username || !password) {
//       setErrorMessage("İstifadəçi adı və şifrəni daxil edin");
//       return;
//     }

//     setLoading(true);
//     let item = { username, password };

//     try {
//       let response = await fetch(
//         "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           body: JSON.stringify(item),
//         }
//       );

//       if (response.status === 401) {
//         setErrorMessage(
//           "Yanlış istifadəçi adı və ya şifrə. Zəhmət olmasa bir daha cəhd edin"
//         );
//       } else if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       } else {
//         let result = await response.json();

//         if (rememberMe) {
//           localStorage.setItem(
//             "user-credentials",
//             JSON.stringify({ username, password })
//           );
//         } else {
//           localStorage.removeItem("user-credentials");
//         }

//         localStorage.setItem("user-info", JSON.stringify(result));
//         window.location.href = "/profile";
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>

//       <Grid
//         container
//         justifyContent="center"
//         alignItems="center"
//         className="login-container"

//       >
//         <Grid item xs={10} sm={10} md={10} lg={4} xl={4}>
//           <Paper elevation={3} className="login-frame">
//             <Typography
//               variant="h4"
//               component="h4"
//               className="login-heading"
//               style={{
//                 marginTop: theme.spacing(3),
//                 marginBottom: theme.spacing(3),
//               }}
//             >
//               Daxil ol
//             </Typography>
//             <form
//               className="loginForm"
//               onSubmit={login}
//               onKeyDown={handleKeyDown}
//             >
//               {/* <Grid item xs={12} className="mb-4"> */}
//               <TextField
//                 className="mb-4"
//                 label="İstifadəçi adı"
//                 variant="outlined"
//                 InputProps={{ style: { color: "#2b2676" } }}
//                 // Assuming you have a state variable for username
//                 value={username}
//                 sx={{ width: "100%", "& fieldset": { borderColor: "#2b2676" } }}
//                 onChange={(e) => setUsername(e.target.value)}
//                 // placeholder="sample@jestdili.az"
//                 // InputLabelProps={{ shrink: true }}
//               />
//               {/* </Grid> */}

//               {/* <Grid item xs={12} className="mb-4"> */}
//               <TextField
//                 className="mb-4"
//                 label="Şifrə"
//                 variant="outlined"
//                 type={passwordVisible ? "text" : "password"}
//                 // Assuming you have a state variable for password
//                 value={password}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={togglePasswordVisibility} edge="end">
//                         {passwordVisible ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ width: "100%", "& fieldset": { borderColor: "#2b2676" } }}
//                 margin="normal"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {/* </Grid> */}
//               {errorMessage && (
//                 <Typography color="error" className="error-message">
//                   {errorMessage}
//                 </Typography>
//               )}
//               <Button
//                 onClick={login}
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 style={{ marginTop: 46 }}
//                 disabled={loading}
//                 startIcon={loading ? <CircularProgress size={24} /> : null}
//               >
//                 {loading ? "Daxil olunur..." : "Daxil ol"}
//               </Button>
//             </form>
//             <div className="login-checkbox-row">
//               <Grid container alignItems="center" className="login-check">
//                 <Grid item>
//                   <Checkbox
//                     className="login-rememberCheckbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                   />
//                 </Grid>

//                 <Grid item>
//                   <Typography variant="body1" className="login-term">
//                     Məni xatırla
//                   </Typography>
//                 </Grid>
//               </Grid>

//               <Typography className="forgot-password">
//                 Şifrəni unutmusan?
//               </Typography>
//             </div>

//             <hr />
//             <Typography className="mb-4">Ya da</Typography>
//             <Typography className="forgot-password">
//               <Link to="/signup">Yeni istifadəçisən?</Link>
//               <Link to="/signup">Qeydiyyatdan keç</Link>
//             </Typography>
//           </Paper>
//         </Grid>

//       </Grid>
//     </Layout>
//   );
// };

// export default LogIn;
