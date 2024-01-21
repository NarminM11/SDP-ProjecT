import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import "../assets/signUp.css";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const[message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validatePassword = (value) => {
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };

  async function signUp() {
    try {
      let item = { name, username, email, password, confirm_password };
      console.log("Payload being sent:", item);
  
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
  
      message.success("Registration successful!");
  
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response) {
        console.log("Server response:", error.response.data);
  
        if (error.response.data.message.includes("username")) {
          setMessage("Username is already taken. Please choose a different one.");
        } else if (error.response.data.message.includes("email")) {
          setMessage("Email is already registered. Please use a different one or log in.");
        } else {
          setMessage("An error occurred during registration.");
        }
      }
    }
  }
  
  

  return (
    <div className="signUp-container">
      <div className="signUp-frame">
        <h2 className="sign-heading">Qeydiyyatdan keç</h2>
        <Row justify="center">
          <Col xs={20} sm={20} md={16} lg={18} xl={20}>
            <div className="signUp-form-container">
              <Form
                name="signUpForm"
                // onFinish={onFinish}
                initialValues={{
                  remember: true,
                }}
                layout="vertical"
              >
                <Form.Item
                  label="Ad Soyad"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your full name!",
                    },
                  ]}
                >
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="signUp-text-input"
                    placeholder="User user"
                  />
                </Form.Item>

                <Form.Item
                  label="İstifadəçi adı"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="signUp-text-input"
                    placeholder="user123"
                  />
                </Form.Item>

                <Form.Item
                  label="Epoçt adressi"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not a valid email address!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="signUp-text-input"
                    placeholder="user123@gamil.com"
                  />
                </Form.Item>

                <Form.Item
  label="Şifrə"
  name="password"
  rules={[
    {
      required: true,
      message: "Please input your password!",
    },
    {
      validator: (_, value) => {
        validatePassword(value);
        return Promise.resolve();
      },
    },
  ]}
>
  <Input.Password
    value={password}
    onChange={(e) => {
      setPassword(e.target.value);
      validatePassword(e.target.value);
    }}
    type="password"
    className="signUp-text-input"
    placeholder="***"
  />
</Form.Item>

{passwordError && (
  <div className="signUp-error-message">
    <p>{passwordError}</p>
  </div>
)}

<Form.Item
  label="Şifrəni Təsdiqləyin"
  name="confirmPassword"
  dependencies={["password"]}
  rules={[
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error("The two passwords do not match!")
        );
      },
    }),
  ]}
>
  <Input.Password
    value={confirm_password}
    onChange={(e) => setConfirm_Password(e.target.value)}
    type="password"
    className="signUp-text-input"
    placeholder="***"
  />
</Form.Item>

<Form.Item
  name="termsCheckbox"
  valuePropName="checked"
  rules={[
    {
      validator: (_, value) =>
        value
          ? Promise.resolve()
          : Promise.reject(
              "Please agree to the Terms & Conditions!"
            ),
    },
  ]}
>
  <Checkbox className="signUp-term">
    Mən Qaydalar və Şərtlərlə razıyam!
  </Checkbox>
</Form.Item>

{message && (
  <div className="signUp-error-message">
    <p>{message}</p>
  </div>
)}


                <Form.Item>
                  <div className="signUp-button">
                    <Button
                      onClick={signUp}
                      type="primary"
                      htmlType="submit"
                      // loading={loading}
                      style={{
                        backgroundColor: "#2b2676",
                        fontSize: 16,
                        fontFamily: "Inter",
                        fontWeight: "400",
                        wordWrap: "break-word",
                      }}
                    >
                      Qeydiyyatdan keç
                    </Button>
                    {/* {message} */}
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>

        <div className="login-option">
          <a href="/login" className="signUp-user">
            Artıq hesabınız var? Daxil olun!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;