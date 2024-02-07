import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Checkbox, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
  const passwordRegex = /^(?=.[A-Z])(?!.[\W_]).{8,}$/;

  const validatePassword = (value, isRequired) => {
    // Check if the password is required and not empty
    if (isRequired && (!value || value.trim() === "")) {
      setPasswordError("Password is required.");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "Parol ən azı 8 simvoldan, bir böyük hərfdən, bir kiçik hərfdən, bir rəqəmdən və bir xüsusi simvoldan ibarət olmalıdır."
      );
    } else {
      setPasswordError("");
    }
  };

  async function signUp(event) {
    try {
      event.preventDefault();

      if (!name || !username || !email || !password || !confirm_password) {
        setMessage("Zəhmət olmasa bütün tələb olunan sahələri doldurun.");
        return;
      }

      // Set the flag to indicate that password is required
      const isPasswordRequired = true;

      let item = { name, username, email, password, confirm_password };
      console.log("Payload being sent:", item);

      validatePassword(password, isPasswordRequired);

      // Check if there is a password error before making the API call
      if (passwordError) {
        return;
      }

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
      window.location.href = "/profile";
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
          setMessage("Qeydiyyat zamanı xəta baş verdi.");
        }

        if (
          error.response.data.message.includes("Password") ||
          error.response.data.message.includes("parol")
        ) {
          setPasswordError(
            "Şifrəniz ən azı 8 simvol uzunluğunda olmalıdır, ən azı bir böyük hərf daxil edin"
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
      <div className="signUp-container">
        <div className="signUp-frame">
          <h2 className="sign-heading">Qeydiyyatdan keç</h2>
          <Form
            name="signUpForm"
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            noValidate
          >
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12} lg={12} xl={24}>
                <Form.Item
                  label="Ad Soyad"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Zəhmət olmasa tam adınızı daxil edin!",
                    },
                  ]}
                >
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="signUp-text-input"
                    placeholder="User user"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12} xl={24}>
                <Form.Item
                  label="İstifadəçi adı"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Zəhmət olmasa istifadəçi adınızı daxil edin!",
                    },
                  ]}
                >
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="signUp-text-input"
                    placeholder="user123"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12} xl={24}>
                <Form.Item
                  label="Epoçt adressi"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Daxil edilən etibarlı e-poçt ünvanı deyil!",
                    },
                    {
                      required: true,
                      message: "Zəhmət olmasa e-poçtunuzu daxil edin!",
                    },
                  ]}
                >
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="signUp-text-input"
                    placeholder="user123@gamil.com"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12} xl={24}>
                <Form.Item
                  label="Şifrə"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Zəhmət olmasa şifrənizi daxil edin!",
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
              </Col>

              <Col xs={24} sm={12} md={12} lg={12} xl={24}>
                <Form.Item
                  label="Şifrəni Təsdiqləyin"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Zəhmət olmasa parolunuzu təsdiqləyin!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("İki parol uyğun gəlmir!")
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
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="termsCheckbox"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              "Zəhmət olmasa Qaydalar və Şərtlərlə razılaşın!"
                            ),
                    },
                  ]}
                >
                  <Checkbox className="signUp-term">
                    Mən Qaydalar və Şərtlərlə razıyam!
                  </Checkbox>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                {message && (
                  <div className="signUp-error-message">
                    <p>{message}</p>
                  </div>
                )}
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item>
                  <div className="signUp-button">
                    <Button
                      onClick={signUp}
                      type="primary"
                      htmlType="submit"
                      style={{
                        backgroundColor: "#2b2676",
                        fontSize: 16,
                        fontFamily: "Inter",
                        fontWeight: "400",
                        wordWrap: "break-word",
                      }}
                      loading={loading}
                      icon={
                        loading ? (
                          <LoadingOutlined style={{ fontSize: 24 }} />
                        ) : null
                      }
                    >
                      {loading ? "Qeydiyyatdan keçilir..." : "Qeydiyyatdan keç"}
                    </Button>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <div className="login-option">
            <a href="/login" className="signUp-user">
              Artıq hesabınız var? Daxil olun!
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
