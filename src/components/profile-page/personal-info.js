import React, { useState, useEffect, createRef, useRef  } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faPen,
  faPenToSquare,
  faLock,
  faArrowRight,
  faEnvelope as farEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Form, Input, message, Space } from "antd";
import axios from "axios";
// import Layout from "../components/Layout/layout";
// import "../assets/profile.css";

const Profile = () => {
  const regex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?!.* ).{8,16}$/;

  const [selectedFile, setSelectedFile] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    username: "",
    emailAddress: "",
  });

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [favoriteWords, setFavoriteWords] = useState([]);
  const [favoriteSentences, setFavoriteSentences] = useState([]);
  const [fileInputRef] = useState(createRef());
  const [accessTokenValue, setAccessTokenValue] = useState("");
  const [incorrectOldPassword, setIncorrectOldPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [fileInput, setFileInput] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  useEffect(() => {
    console.log("Fetching personal info...");
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      const token = localStorage.getItem("user-info");
      const tokenObject = JSON.parse(token);
      const accessTokenValue = tokenObject.access_token;

      setAccessTokenValue(accessTokenValue);

      if (!token) {
        console.error("User token not found in localStorage");
        throw new Error("User token not found");
      }

      const response = await axios.get(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/info",
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
          },
        }
      );

      console.log("Response:", response);

      setPersonalInfo({
        fullName: response.data.user_info.user_name,
        username: response.data.user_info.user_username,
        emailAddress: response.data.user_info.user_email,
      });

      //user's profile image
      setProfileImage(response.data.user_info.user_img);

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching personal info:",
        error.response?.data.message || error.message
      );
      throw error;
    }
  };

  // useEffect(() => {
  //   console.log("Fetching personal info...");
  //   fetchPersonalInfo()
  //     .then((data) => {
  //       console.log("Data:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   console.log("Fetching personal info...");
  //   fetchPersonalInfo();
  // }, []);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await axios.get(
          "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/info",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-info")}`,
            },
          }
        );
        console.log("Response:", response);
        setPersonalInfo({
          fullName: response.data.user_info.user_name,
          username: response.data.user_info.user_username,
          emailAddress: response.data.user_info.user_email,
        });

        // Retrieve and set the cached photo from local storage
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.log("Validation error:", error.response.data);
        } else {
          console.error("Other error:", error);
        }
      }
    };

    fetchPersonalInfo();
  }, []);

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

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

  //favorite words and sentences
  const fetchFavoriteWords = async () => {
    const token = localStorage.getItem("user-info");
    const tokenObject = JSON.parse(token);
    const accessTokenValue = tokenObject.access_token;

    try {
      const wordsResponse = await axios.get(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/learnLaterWords",
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
          },
        }
      );
      console.log("Words Response:", wordsResponse);

      const sentencesResponse = await axios.get(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/learnLaterSentences",
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
          },
        }
      );

      setFavoriteWords(wordsResponse.data.words);
      setFavoriteSentences(sentencesResponse.data.sentences);
    } catch (error) {
      console.error("Error fetching favorite words/sentences:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching personal info...");
    fetchPersonalInfo();
    fetchFavoriteWords();
  }, []);

  const [isUploadButtonVisible, setUploadButtonVisibility] = useState(true);
  const [isChangeButtonVisible, setChangeButtonVisibility] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    console.log("Selected File:", file);
    setSelectedFile(file);
    setIsImageChanged(true);
    setHasUploadedImage(true);

    setUploadedFileName(file.name);

  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log("Selected File:", file);
    setSelectedFile(file);
    setIsImageChanged(true);
    setHasUploadedImage(true);
  };

  const generateTimestamp = () => new Date().getTime();

  const handleSaveImage = async () => {
    if (!isImageChanged || !selectedFile) {
      return;
    }

    try {
      const timestamp = generateTimestamp();
      const imageUrl = `https://morning-plains-82582-f0e7c891044c.herokuapp.com/${profileImage}?timestamp=${timestamp}`;

      setProfileImage(imageUrl);

      const formData = new FormData();
      formData.append("image", selectedFile);
      const response = await axios.post(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfileImage(response.data.imageUrl);

      console.log("Image Upload Response:", response.data);

      message.success("Profile image saved successfully");
      setIsImageChanged(false);
    } catch (error) {
      console.error(
        "Error saving image:",
        error.response?.data || error.message
      );
      message.error("Failed to save profile image. Please try again.");
    }
  };

  
  const handleRemoveImage = async () => {
    try {
      const response = await axios.delete(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/remove-image",
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
          },
        }
      );

      console.log("Remove Image Response:", response.data);
      // Update the profile image in the state or trigger a re-fetch of user data
      // based on your application's structure
      setProfileImage(null); // Update to reflect the absence of an image
      setHasUploadedImage(false); // Reset the uploaded image status

      message.success("Profile image removed successfully");
    } catch (error) {
      console.error("Error removing image:", error);
      message.error("Failed to remove profile image. Please try again.");
    }
  };

  // const history = useHistory();
  const handleLogout = async () => {
    try {
      // Check if "user-info" exists in localStorage
      const token = localStorage.getItem("user-info");

      if (!token) {
        console.error("User token not found in localStorage");
        // Redirect the user to the login page or another appropriate page
        // history.push("/login"); // Replace "/login" with the path to your login page
        return;
      }

      const tokenObject = JSON.parse(token);
      const accessTokenValue = tokenObject.access_token;

      const response = await axios.delete(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/logout",
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
          },
        }
      );

      console.log("Logout Response:", response.data);

      // Clear user information from local storage
      localStorage.removeItem("user-info");

      // Redirect the user to the login page or another appropriate page
      // history.push("/login"); // Replace "/login" with the path to your login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const resetPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setIncorrectOldPassword(false);
  };

  // Add a useEffect to perform the state updates after re-render
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
  return (
    // <Layout>
    <Row justify="center">
      <Col
        xs={{ span: 24, offset: 0 }}
        lg={{ span: 7, offset: 0 }}
        style={{
          display: "flex",
          margin: "10px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }} className="photo-box">
          <div
            key={profileImage}
            className="circular"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundImage: `url("${
                profileImage ||
                "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
              }")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="user_name">{personalInfo.fullName}</div>
        </div>
        {uploadedFileName && (
      <div className="uploaded-file-name">{uploadedFileName}</div>
    )}
    {hasUploadedImage && (
      <Button
        className="revert-button"
        type="danger"
        onClick={() => {
          setHasUploadedImage(false);
          setUploadedFileName(""); 
          setSelectedFile(null); 
        }}
      >
        X
      </Button>
    )}
        <Col>
          <Row className="profile-photo-buttons">
            <Row>
              {hasUploadedImage ? (
                <></>
              ) : (
                <>
                  <label className="button-profile-photo" htmlFor="fileInput">
                    Şəkil yükləyin
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    style={{
                      display: "none",
                      width: "50%",
                      height: "40px",
                      fontSize: "16px",
                      fontFamily: "Inter",
                      fontWeight: "400",
                    }}
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                </>
              )}
            </Row>
            <Row>
              {hasUploadedImage && (
                <>
                  <label
                    className="button-profile-photo"
                    htmlFor="fileInput"
                    style={{
                      cursor: "pointer",
                    }}
                    key={isImageChanged}
                  >
                    Şəkili dəyişin
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    style={{
                      display: "none",
                    }}
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                </>
              )}
            </Row>
            <Row>
              <Button
                className="button-profile-photo"
                type="danger"
                onClick={handleRemoveImage}
                style={{
                  height: "40px",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: "400",
                }}
              >
                Şəkili silin
              </Button>
            </Row>
            <Row>
              <Button
                className="profile-save-image"
                type="primary"
                onClick={handleSaveImage}
                disabled={!isImageChanged}
                style={{
                  height: "40px",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: "400",
                }}
              >
                Yadda saxla
              </Button>
            </Row>
          </Row>
        </Col>

        <Row justify="center">
          <Col>
            {/* <div
              className="profile-heart-icon"
              style={{ width: "100%", height: "100%", color: "#2B2676" }}
            >
              <FontAwesomeIcon
                icon={farHeart}
                className="profile-heart-icon"
                //  onClick={handleHeartIconClick}
              />
            </div> */}
          </Col>
          <Col>
            <div
              className="profile-exit-icon"
              style={{ width: "100%", height: "100%", color: "#2B2676" }}
              onClick={handleLogout} // Call handleLogout when the exit icon is clicked
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
          </Col>
        </Row>
      </Col>
      <Col
        xs={{ span: 24, offset: 0 }}
        md={{ span: 24, offset: 0 }}
        lg={{ span: 24, offset: 0 }}
        xl={{ span: 12, offset: 0 }}
      >
        <Row className="profile-box">
          <Col
            className="first-frame"
            xs={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 12, offset: 0 }}
          >
            <p className="edit-details">
              <FontAwesomeIcon icon={faPenToSquare} /> Profil detallarını
              redaktə et{" "}
              <FontAwesomeIcon
                className="profile-arrow-icon"
                icon={faArrowRight}
              />
            </p>
            <h4 className="profile-heading">Şəxsi məlumatlar</h4>
            <Row className="fullname">
              <Col
                className="custom-col1"
                xs={{ span: 4, offset: 0 }}
                md={{ span: 8, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 8, offset: 0 }}
              >
                Ad Soyad
              </Col>
              <Col
                className="custom-col1"
                xs={{ span: 8, offset: 0 }}
                md={{ span: 4, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
              >
                :
              </Col>
              <Col
                className="custom-col1"
                xs={{ span: 8, offset: 0 }}
                md={{ span: 8, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 6, offset: 0 }}
              >
                {personalInfo.fullName}
              </Col>
            </Row>
            <Row className="username">
              <Col
                className="custom-col1"
                xs={{ span: 4, offset: 0 }}
                md={{ span: 8, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 8, offset: 0 }}
              >
                İstifadəçi adı
              </Col>
              <Col
                className="custom-col1"
                xs={{ span: 8, offset: 0 }}
                md={{ span: 4, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
              >
                :
              </Col>
              <Col
                className="custom-col1"
                xs={{ span: 8, offset: 0 }}
                md={{ span: 8, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 6, offset: 0 }}
              >
                {personalInfo.username}
              </Col>
            </Row>
            <Row className="email">
              <Col
                className="custom-col1"
                xs={{ span: 6, offset: 0 }}
                md={{ span: 8, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 8, offset: 0 }}
              >
                Elektron poçt
              </Col>
              <Col
                className="custom-col1"
                xs={{ span: 6, offset: 0 }}
                md={{ span: 4, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
              >
                :
              </Col>
              <Col
                className="custom-col1"
                xs={{ span: 6, offset: 0 }}
                md={{ span: 8, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 6, offset: 0 }}
              >
                {personalInfo.emailAddress}
              </Col>
            </Row>
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 12, offset: 0 }}
            style={{}}
          >
            <Row justify="center" align="middle" style={{ height: "100%" }}>
              <Form
                name="accountSettingsForm"
                className="profile-accountSettings"
                onFinish={handleSubmit}
              >
                {/* <div className="changeEmail">
                  <p>
                    <FontAwesomeIcon icon={farEnvelope} /> Change email address
                  </p>
                  <Row>
                    <Form.Item
                      name="newEmail"
                      label="Update email address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter new email address!",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email address!",
                        },
                      ]}
                    >
                      <Input
                        className="profile-input edit-input"
                        placeholder="Enter new Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </Form.Item>
                  </Row>
                </div>
                <hr /> */}

                <div className="changePass">
                  <p>
                    <FontAwesomeIcon icon={faLock} /> Şifrəni dəyişmək
                  </p>{" "}
                  <Row>
                    <Form.Item
                      name="currentPass"
                      label="Köhnə şifrə"
                      rules={[
                        {
                          required: true,
                          message: "Zəhmət olmasa mövcut şifrənizi daxil edin!",
                        },
                      ]}
                    >
                      <Input.Password
                        className={`profile-input edit-input ${
                          incorrectOldPassword ? "error-input" : ""
                        }`}
                        style={{ width: "100%", marginLeft: "10px" }}
                        placeholder="Köhnə şifrəni daxil edin!"
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                      />
                    </Form.Item>
                    {incorrectOldPassword && (
                      <div className="error-message">
                        {incorrectOldPassword}
                      </div>
                    )}
                  </Row>
                </div>

                <div className="newPass" style={{ marginBottom: "20px" }}>
                  <Form.Item
                    name="newPassword"
                    label="Yeni şifrə"
                    hasFeedback
                    validateStatus={newPasswordError ? "error" : ""}
                    help={newPasswordError}
                    rules={[
                      {
                        required: true,
                        message: "Zəhmət olmasa yeni şifrə daxil edin!",
                      },
                      { validator: (_, value) => validateNewPassword(value) },
                    ]}
                    dependencies={["newPassword", "confirmPassword"]}
                  >
                    <Input.Password
                      className="profile-input edit-input"
                      style={{ width: "58%", marginLeft: "25px" }}
                      placeholder="Yeni şifrəni daxil edin!"
                      onChange={handleNewPasswordChange}
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Təsdiq şifrə"
                    hasFeedback
                    validateStatus={confirmPasswordError ? "error" : ""}
                    help={confirmPasswordError}
                    rules={[
                      {
                        required: true,
                        message: "Zəhmət olmasa şifrənizi təsdiqləyin!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            setConfirmPasswordError("");
                            return Promise.resolve();
                          }
                          setConfirmPasswordError("Şifrələr uyğun gəlmir!");
                          return Promise.reject("Passwords do not match!");
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      className="profile-input edit-input"
                      style={{ width: "61%", marginLeft: "10px" }}
                      placeholder="Təsdiq şifrəni daxil edin"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        validateConfirmPassword(e.target.value);
                      }}
                      onBlur={() => validateConfirmPassword(confirmPassword)}
                    />
                  </Form.Item>
                </div>

                <Row>
                  <div className="profile-button">
                    <Space>
                    <Button
              type="button"
              onClick={handleCancel}
              style={{
                borderColor: "#2B2676",
                backgroundColor: "white",
                borderRadius: "5px",
                width: "100%",
                height: "40px",
                fontSize: "16px",
                fontFamily: "Inter",
                fontWeight: "400",
              }}
            >
              Ləğv etmək
            </Button>

                      <Button
                        type="primary"
                        htmlType="submit"
                        className="profile-save-button"
                        style={{
                          // textAlign:"center",
                          borderRadius: "5px",
                          margin: "10px",
                          width: "100%",
                          height: "40px",
                          fontSize: "16px",
                          fontFamily: "Inter",
                          fontWeight: "400",
                        }}
                      >
                        Yadda saxla
                      </Button>
                    </Space>
                  </div>
                </Row>
              </Form>
            </Row>
          </Col>
        </Row>
      </Col>
      <Row className="fav-box">
        {(!favoriteWords || favoriteWords.length === 0) &&
        (!favoriteSentences || favoriteSentences.length === 0) ? (
          <Col
            className="first-frame empty-favorites"
            xs={24}
            md={24}
            lg={24}
            xl={14}
          >
            <p className="edit-details">
              <FontAwesomeIcon icon={farHeart} /> My Favorite Words & Sentences
            </p>
            <h4 className="profile-heading">
              You don't have any favorite words or sentences yet.
            </h4>
          </Col>
        ) : (
          <React.Fragment>
            {/* Display favorite words */}
            {favoriteWords && favoriteWords.length > 0 && (
              <Col
                className="first-frame"
                xs={24}
                md={24}
                lg={12}
                xl={14}
              ></Col>
            )}

            {/* Display favorite sentences */}
            {favoriteSentences && favoriteSentences.length > 0 && (
              <Col
                className="second-frame"
                xs={24}
                md={24}
                lg={12}
                xl={14}
              ></Col>
            )}
          </React.Fragment>
        )}
      </Row>
    </Row>

    // </Layout>
  );
};

export default Profile;

