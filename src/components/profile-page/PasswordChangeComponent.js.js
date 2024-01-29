import React, { useState, useEffect, createRef, useRef  } from "react";
import axios from "axios";
// Update the import statement in PasswordChangeComponent.js
// import { validatePassword } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faPen,
  faPenToSquare,
  faLock,
  faArrowRight,
  faEnvelope as farEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Form, Input, message, Space } from "antd";

const PasswordChangeComponent = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [incorrectOldPassword, setIncorrectOldPassword] = useState(false);
  const [accessTokenValue, setAccessTokenValue] = useState("");
  const [email, setEmail] = useState("");


  const regex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?!.* ).{8,16}$/;

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
    setIncorrectOldPassword(false);
  };

  const validateNewPassword = (value) => {
    return new Promise((resolve, reject) => {
      if (!regex.test(value)) {
        setNewPasswordError(
          "Şifrədə ən azı bir kiçik hərf, bir böyük hərf, bir xüsusi simvol və ən azı 8 simvol uzunluğunda olmalıdır"
        );
        console.log("password sehvdi");
        return false;
      } else {
        setNewPasswordError("");
        console.log("password duzdu");
        resolve();
      }
    });
  };


  const handleNewPasswordChange = (event) => {
    const value = event.target.value;
    validateNewPassword(value);
    setNewPassword(value);
  };
  const validateConfirmPassword = (value) => {
    if (value !== newPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };
  const handleSubmit = async (values) => {
    try {
      const { currentPass, newPassword, confirmPassword } = values;

      if (
        !validateNewPassword(newPassword) ||
        !validateConfirmPassword(confirmPassword)
      ) {
        return;
      }

      const token = localStorage.getItem("user-info");
      const tokenObject = JSON.parse(token);
      const accessTokenValue = tokenObject.access_token;

      const response = await axios.post(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/changePassword",
        {
          old_password: currentPass,
          new_password: newPassword,
          confirm_new_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      console.log("Request:", response.config);
      console.log("Response:", response.data);

      message.success("Password changed successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      if (error.response && error.response.status === 401) {
        setIncorrectOldPassword(true);
        console.log("Old password is incorrect");
      } else {
        message.error("Failed to update password. Please try again.");
      }
    }
  };
  const formRef = useRef();

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    // Reset the form fields using formRef.current
    formRef.current && formRef.current.resetFields();
  };

  const resetPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setIncorrectOldPassword(false);
  };
  useEffect(() => {
    if (
      currentPassword === "" &&
      newPassword === "" &&
      confirmPassword === ""
    ) {
      setNewPasswordError("");
      setConfirmPasswordError("");
      setIncorrectOldPassword(false);
    }
  }, [currentPassword, newPassword, confirmPassword]);

  return (
<>
<div className="change-password-heading">
  <p className="falock">
    <FontAwesomeIcon icon={faLock} /> Şifrəni dəyişmək
  </p>{" "}
  </div>

    <Form
      name="accountSettingsForm"
      className="profile-accountSettings"
      onFinish={handleSubmit}
    >
       
      <Row className="old-password">
        <Col xs={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 24 }}>
          <Form.Item
            name="currentPass"
            label="Köhnə şifrə"
            rules={[
              {
                required: true,
                message: 'Zəhmət olmasa mövcut şifrənizi daxil edin!',
              },
            ]}
          >
            <Input.Password
              className={`profile-input edit-input ${
                incorrectOldPassword ? 'error-input' : ''
              }`}
              placeholder="Köhnə şifrəni daxil edin!"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Item>
          {incorrectOldPassword && (
            <div className="error-message">{incorrectOldPassword}</div>
          )}
        </Col>
      </Row>

      <Row className="new-password">
        <Col xs={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 24 }}>
          <Form.Item
            name="newPassword"
            label="Yeni şifrə"
            hasFeedback
            validateStatus={newPasswordError ? 'error' : ''}
            help={newPasswordError}
            rules={[
              {
                required: true,
                message: 'Zəhmət olmasa yeni şifrə daxil edin!',
              },
              { validator: (_, value) => validateNewPassword(value) },
            ]}
          >
            <Input.Password
              className="profile-input edit-input"
              placeholder="Yeni şifrəni daxil edin!"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row className="confirm-password">
        <Col xs={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 24 }}>
          <Form.Item
            name="confirmPassword"
            label="Təsdiq şifrə"
            hasFeedback
            validateStatus={confirmPasswordError ? 'error' : ''}
            help={confirmPasswordError}
            rules={[
              {
                required: true,
                message: 'Zəhmət olmasa şifrənizi təsdiqləyin!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    setConfirmPasswordError('');
                    return Promise.resolve();
                  }
                  setConfirmPasswordError('Şifrələr uyğun gəlmir!');
                  return Promise.reject('Passwords do not match!');
                },
              }),
            ]}
          >
            <Input.Password
              className="profile-input edit-input"
              placeholder="Təsdiq şifrəni daxil edin"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => validateConfirmPassword(confirmPassword)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <div className="profile-button">
          <Space>
            <Button
              type="button"
              onClick={handleCancel}
              style={{
                borderColor: '#2B2676',
                backgroundColor: 'white',
                borderRadius: '5px',
                width: '100%',
                height: '40px',
                fontSize: '16px',
                fontFamily: 'Inter',
                fontWeight: '400',
              }}
            >
              Ləğv etmək
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className="profile-save-button"
              style={{
                borderRadius: '5px',
                margin: '10px',
                width: '100%',
                height: '40px',
                fontSize: '16px',
                fontFamily: 'Inter',
                fontWeight: '400',
              }}
            >
              Yadda saxla
            </Button>
          </Space>
        </div>
      </Row>
    </Form>
    </>
  );
};

export default PasswordChangeComponent;
