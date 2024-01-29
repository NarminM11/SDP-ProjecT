import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import "../assets/login.css";

import Profile from "./profile";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const storedCredentials = localStorage.getItem("user-credentials");
    if (storedCredentials) {
      const { username, password } = JSON.parse(storedCredentials);
      setUsername(username);
      setPassword(password);
    }
  }, []);
  
  async function login() {
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
        setErrorMessage("Yanlış istifadəçi adı və ya şifrə. Zəhmət olmasa bir daha cəhd edin");
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        let result = await response.json();

        if (rememberMe) {
          localStorage.setItem("user-credentials", JSON.stringify({ username, password }));
        }

        localStorage.setItem("user-info", JSON.stringify(result));
        window.location.href = "/profile"; 
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-frame">
        <h2 className="login-heading">Daxil ol</h2>
        <Row className="row-login-form">
          <Col xs={24} sm={20} md={16} lg={12} xl={20}>
            <div className="login-form-container">
              <Form name="loginForm" layout="vertical">
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
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-text-input"
                    placeholder="sample@jestdili.az"
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
                  ]}
                >
                  <Input.Password
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-text-input"
                    placeholder="*******"
                  />
                </Form.Item>
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
                <Form.Item>
                  <div className="login-button">
                    <Button
                      onClick={login}
                      type="submit"
                      style={{
                        color: "#fff",
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
                      {loading ? "Daxil olunur..." : "Daxil ol"}
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>

        <div className="login-checkbox-row">
          <div className="login-check-remember">
            <Checkbox
              className="rememberCheckbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              Məni xatırla
            </Checkbox>
          </div>
          <p className="forgot-password">
            {/* <Link to="/forgot-password"> */}
            Şifrəni unutmusan?
            {/* </Link> */}
          </p>
        </div>

        {/* {resetEmailSent && <div className="reset-email-sent-message"></div>} */}
        <hr />
        <p>Ya da</p>
        <p className="forgot-password">
          {/* <Link to="/forgot-password"> */}
          Yeni istifadəçisən? Qeydiyyatdan keçin
          {/* </Link> */}
        </p>
      </div>
    </div>
  );
};

export default LogIn;
