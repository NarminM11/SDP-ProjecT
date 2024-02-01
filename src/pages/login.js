import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../assets/login.css";
import Layout from "../components/Layout/layout";

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
          // Clear stored credentials if rememberMe is false
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
  }

  return (
    <Layout>
      <div className="login-container">
        <div className="login-frame">
          <h2 className="login-heading">Daxil ol</h2>
          <Form className="loginForm" layout="vertical">
            <Row gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
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
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
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
                    style={{borderRadius:"8px" }}

                    placeholder="*******"
                  />
                </Form.Item>
              </Col>
            </Row>
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
                    // fontFamily: "Inter",
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

          <hr />
          <p>Ya da</p>
          <p className="forgot-password">
          <Link to="/signup">Yeni istifadəçisən? Qeydiyyatdan keçin</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LogIn;
