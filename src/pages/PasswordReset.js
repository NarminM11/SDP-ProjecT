// import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { Form, Input, Button } from "antd";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PasswordReset = () => {
//   // const navigate = useNavigate(); // Use useNavigate
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const handleSendOtp = async () => {
//     try {
//       // Send a request to your server to generate and send OTP to the provided email
//       // Update the server endpoint accordingly
//       let response = await fetch(
//         "https://your-server.com/reset-password",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         }
//       );

//       if (response.ok) {
//         toast.success("OTP sent to your email. Check your inbox.");
//       } else {
//         toast.error("Failed to send OTP. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//     }
//   };

//   const handleResetPassword = async () => {
//     try {
//       // Send a request to your server to verify OTP and set the new password
//       // Update the server endpoint accordingly
//       let response = await fetch(
//         "https://your-server.com/verify-otp-and-reset",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, otp, newPassword }),
//         }
//       );

//       if (response.ok) {
//         toast.success("Password reset successfully. You can now log in with your new password.");
//         // navigate.push("/login"); // Redirect to the login page
//       } else {
//         toast.error("Failed to reset password. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error resetting password:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       <Form>
//         <Form.Item label="Email">
//           <Input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Item>

//         <Form.Item label="OTP">
//           <Input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <Button onClick={handleSendOtp}>Send OTP</Button>
//         </Form.Item>

//         <Form.Item label="New Password">
//           <Input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button onClick={handleResetPassword}>Reset Password</Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default PasswordReset;
