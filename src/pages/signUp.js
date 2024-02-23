

import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/system";
import {
  Button,
  Checkbox,
  TextField,
  Grid,
  Container,
  CircularProgress,
  Typography,
} from "@mui/material";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import "../assets/signUp.css";
import Layout from "../components/Layout/layout";
import { Link } from "react-router-dom";
import "../assets/signUp.css";


const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [message, setMessage] = useState("");
  const [password_message, setPasswordMessage] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const theme = useTheme();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      signUp(event);
    }
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

      const passwordValidationError = validatePassword(password);
      if (passwordValidationError) {
        setPasswordMessage(passwordValidationError);
        return;
      }

      if (password !== confirm_password) {
        setMessage("Şifrə və şifrəni təsdiqlə sahələri eyni olmalıdır.");
        return;
      }
      
      // const isPasswordRequired = true;

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

      // setMessage("Qeydiyyat uğurlu oldu!");
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
      <div className="signUp-container w-100 d-flex align-items-center justify-content-center">
        <form onSubmit={signUp} onKeyDown={handleKeyDown}
        className="w-100 d-flex align-items-center justify-content-center">
          <Grid item xs={10} sm={10} md={10} lg={4} xl={4}
      container
      justifyContent="center" // Center the content horizontally
      alignItems="center"    // Center the content vertically
      className="signUp-frame mt-5"
    >
            <Grid item xs={12} className="sign-heading mt-4">
              <p className="sign-head-text"
                
              >
                Qeydiyyatdan <span>keç</span>
              </p>
            </Grid>

            <Grid item xs={12} className="mt-4">
              <TextField
                className="signUp-text-input"
                label="Ad Soyad"
                variant="outlined"
                sx={{ width: "90%",
                //  "& fieldset": { borderColor: "#2b2676" } 
              }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{
                  style: { color: "#2b2676" } // Set the color of the label here
                }}
              />
            </Grid>

            <Grid item xs={12} className="mt-4">
              <TextField
                className="signUp-text-input"
                label="İstifadəçi adı"
                variant="outlined"
                InputProps={{ style: { color: "#2b2676" } }}
                sx={{ width: "90%", 
                // "& fieldset": { borderColor: "#2b2676" } 
              }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={{
                  style: { color: "#2b2676" } // Set the color of the label here
                }}
              />
            </Grid>

            <Grid item xs={12} className="mt-4">
              <TextField
                className="signUp-text-input"
                label="Epoçt adressi"
                variant="outlined"
                sx={{ width: "90%", 
                // "& fieldset": { borderColor: "#2b2676" }
               }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{
                  style: { color: "#2b2676" } // Set the color of the label here
                }}
              />
            </Grid>

            <Grid item xs={12} className="mt-4">
              <TextField
                className="signUp-text-input"
                label="Şifrə"
                variant="outlined"
                sx={{ width: "90%", 
                // "& fieldset": { borderColor: "#2b2676" }
               }}
                InputLabelProps={{
                  style: { color: "#2b2676" } // Set the color of the label here
                }}
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        // style={{ color: "#2b2676" }}
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
            <Grid item xs={12} className="mt-4">
            <TextField
          className="signUp-text-input"
          label="Şifrəni Təsdiqləyin"
          variant="outlined"
          sx={{ width: "90%", 
          // "& fieldset": { borderColor: "#2b2676" } 
        }}
          InputLabelProps={{
            style: { color: "#2b2676" } // Set the color of the label here
          }}
          type={confirmPasswordVisible ? "text" : "password"}
          value={confirm_password}
          onChange={(e) => setConfirm_Password(e.target.value)} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleConfirmPasswordVisibility}
                  edge="end"
                  // style={{ color: "#2b2676" }}
                >
                  {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
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
// import React, { useState, useEffect } from "react";
// import { useTheme } from "@mui/system";
// import {
//   Button,
//   Checkbox,
//   TextField,
//   Grid,
//   Container,
//   CircularProgress,
//   Typography,
// } from "@mui/material";
// import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import { InputAdornment, IconButton } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import axios from "axios";
// import "../assets/signUp.css";
// import Layout from "../components/Layout/layout";
// import { Link } from "react-router-dom";
// import "../assets/signUp.css";

// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const theme = useTheme();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [confirm_password, setConfirm_Password] = useState("");
//   const [message, setMessage] = useState("");
//   const [password_message, setPasswordMessage] = useState("");

//   const [passwordError, setPasswordError] = useState("");
//   const [termsChecked, setTermsChecked] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

//   const toggleConfirmPasswordVisibility = () => {
//     setConfirmPasswordVisible(!confirmPasswordVisible);
//   };

//   const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

//   const validatePassword = (value) => {
//     let error = "";
//     if (!value.trim()) {
//       error = "Şifrə tələb olunur.";
//     } else if (!passwordRegex.test(value)) {
//       error =
//         "Şifrəniz ən azı 8 simvol uzunluğunda olmalıdır, ən azı bir böyük hərf daxil edin";
//     }
//     setPasswordError(error);
//     return error;
//   };

//   useEffect(() => {
//     if (passwordError) {
//       return;
//     }
//   }, [passwordError]);

//   async function signUp(event) {
//     try {
//       event.preventDefault();

//       if (!name || !username || !email || !password || !confirm_password) {
//         setMessage("Zəhmət olmasa bütün tələb olunan sahələri doldurun.");
//         return;
//       }

//       const passwordValidationError = validatePassword(password);
//       if (passwordValidationError) {
//         setPasswordMessage(passwordValidationError);
//         return;
//       }

//       if (password !== confirm_password) {
//         setMessage("Şifrə və şifrəni təsdiqlə sahələri eyni olmalıdır.");
//         return;
//       }

//       // const isPasswordRequired = true;

//       let item = { name, username, email, password, confirm_password };
//       console.log("Payload being sent:", item);

//       validatePassword(password);

//       let result = await axios.post(
//         "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/register",
//         item,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );

//       const token = result.data.access_token;

//       if (token) {
//         localStorage.setItem("user-token", token);
//       }

//       // setMessage("Qeydiyyat uğurlu oldu!");
//       window.location.href = "/login";
//     } catch (error) {
//       console.error("Error during signup:", error);
//       if (error.response) {
//         console.log("Server response:", error.response.data);

//         if (error.response.data.message.includes("username")) {
//           setMessage(
//             "İstifadəçi adı artıq istifadə olunur. Fərqli birini seçin."
//           );
//         } else if (error.response.data.message.includes("email")) {
//           setMessage(
//             "E-poçt artıq qeydiyyatdan keçib. Fərqli istifadə edin və ya daxil olun."
//           );
//         } else {
//           setMessage("An error occurred during registration.");
//         }

//         if (
//           error.response.data.message.includes("Password") ||
//           error.response.data.message.includes("parol")
//         ) {
//           setPasswordError(
//             "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
//           );
//         } else {
//           setPasswordError("");
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   }
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     console.log("Visibility button clicked");
//     setPasswordVisible(!passwordVisible);
//   };
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       signUp(event);
//     }
//   };
 

 

//   return (
//     <Layout>
//       <div>
//         <Grid
//           container
//           justifyContent="center"
//           alignItems="center"
//           style={{ height: "100vh" }}
//         >
//           {/* <Grid item xs={10} sm={8} md={6} lg={4} xl={4}> */}
//           <div className="register_container">
//             <div className="register_screen">
//               <div className="register_screen__content">
//                 <form
//                   className="register"
//                   onSubmit={signUp}
//                   onKeyDown={handleKeyDown}
//                 >
//                   {/* <h1 style={{ textAlign: "center", color: "blue"}} className="login-heading">Daxil Ol</h1> */}

//                   <div className="register__field">
//                     <TextField
//                       className="signUp-text-input"
//                       label="Ad Soyad"
//                       variant="outlined"
//                       sx={{
//                         width: "100%",
//                         "& fieldset": { borderColor: "#2b2676" },
//                       }}
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                     />
//                   </div>
//                   <div className="register__field">
//                     <TextField
//                       className="signUp-text-input"
//                       label="İstifadəçi adı"
//                       variant="outlined"
//                       InputProps={{ style: { color: "#2b2676" } }}
//                       sx={{
//                         width: "100%",
//                         "& fieldset": { borderColor: "#2b2676" },
//                       }}
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                     />
//                   </div>
//                   <div className="register__field">
//                     <TextField
//                       className="signUp-text-input"
//                       label="Epoçt adressi"
//                       variant="outlined"
//                       sx={{
//                         width: "100%",
//                         "& fieldset": { borderColor: "#2b2676" },
//                       }}
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                   <div className="register__field">
//                     <TextField
//                       className="signUp-text-input"
//                       label="Şifrə"
//                       variant="outlined"
//                       sx={{
//                         width: "100%",
//                         "& fieldset": { borderColor: "white" },
//                       }}
//                       InputLabelProps={{
//                         style: { color: "white" } // Set the color of the label here
//                       }}
//                       type={passwordVisible ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <IconButton
//                               onClick={togglePasswordVisibility}
//                               edge="end"
//                               style={{ color: "white" }}
//                             >
//                               {passwordVisible ? (
//                                 <VisibilityOff />
//                               ) : (
//                                 <Visibility />
//                               )}
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                     {passwordError && (
//                       <div className="signUp-error-message">
//                         <p>{passwordError}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div className="register__field">
//                     <TextField
//                       className="signUp-text-input"
//                       label="Şifrəni Təsdiqləyin"
//                       variant="outlined"
//                       sx={{
//                         width: "100%",
//                         "& fieldset": { borderColor: "white" },
//                       }}
//                       InputLabelProps={{
//                         style: { color: "white" } // Set the color of the label here
//                       }}
//                       type={confirmPasswordVisible ? "text" : "password"}
//                       value={confirm_password}
//                       onChange={(e) => setConfirm_Password(e.target.value)}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <IconButton
//                               onClick={toggleConfirmPasswordVisibility}
//                               edge="end"
//                               style={{ color: "white" }}
//                             >
//                               {confirmPasswordVisible ? (
//                                 <VisibilityOff />
//                               ) : (
//                                 <Visibility />
//                               )}
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                     <Grid container alignItems="center" className="check">
//                       <Grid item>
//                         <Checkbox
//                           checked={termsChecked}
//                           onChange={(e) => setTermsChecked(e.target.checked)}
//                           style={{ color: "white" }}
//                         />
//                       </Grid>
//                       <Grid item>
//                         <Typography variant="body1" className="signUp-term">
//                           Mən Qaydalar və Şərtlərlə razıyam!
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                     <Grid item xs={12}>
//                       {message && (
//                         <div className="signUp-error-message">
//                           <p>{message}</p>
//                         </div>
//                       )}
//                     </Grid>
//                   </div>
//                   <div
//                     className="
//         d-flex flex-direction-column align-items-center justify-content-center
//         "
//                   >
//                     <button
//                       className="button register__submit "
//                       type="submit"
//                       variant="contained"
//                       color="primary"
//                       // size="large"
//                       disabled={loading}
//                       style={{
//                         // marginLeft: 90,
//                         marginTop: 46,
//                         // color: "white",
//                         // width: "30%",

//                         background:
//                           "linear-gradient(90deg, rgba(3,3,47,1) 0%, rgba(214,213,224,1) 0%, rgba(17,8,103,1) 24%, rgba(9,7,50,1) 88%, rgba(241,246,247,1) 100%)",
//                       }}
//                       startIcon={
//                         loading ? (
//                           <CircularProgress
//                             size={24}
//                             className="button__text"
//                           />
//                         ) : null
//                       }
//                     >
//                       {loading ? "Qeydiyyatdan keçilir..." : "Qeydiyyatdan keç"}
//                       <i
//                         class="button__icon fas fa-chevron-right"
//                         style={{ color: "white" }}
//                       ></i>
//                     </button>
//                     </div>

//                     <Grid item xs={12}  className="signUp-user mt-6"
//                     >
//                       <Typography variant="body1" >
//                         <a href="/login"                      
//                              style={{ color: "white",
//                              }}
// >
//                           Artıq hesabınız var? Daxil olun!
//                         </a>
//                       </Typography>
//                     </Grid>
//                 </form>
//               </div>
//               <div className="screen__background">
//               <span className="screen__background__shape screen__background__shape5"></span>

//               <span className="screen__background__shape screen__background__shape5"></span>
//                 <span className="screen__background__shape screen__background__shape4"></span>
//                 <span className="screen__background__shape screen__background__shape3"></span>
//                 <span className="screen__background__shape screen__background__shape2"></span>
//                 <span className="screen__background__shape screen__background__shape1"></span>

//               </div>
//             </div>
//           </div>
//         </Grid>
//         {/* </Grid> */}
//       </div>
//     </Layout>
//   );
// };

// export default LoginForm;
