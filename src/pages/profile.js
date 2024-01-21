import React, { useState, useEffect, createRef } from "react";
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
import "../assets/profile.css";

const Profile = () => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&()_+{}\[\]:;<>,.?~\\-]).{8,}$/;

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

  const fetchPersonalInfo = async () => {
    const token = localStorage.getItem("user-info");

    const tokenObject = JSON.parse(token);
    const accessTokenValue = tokenObject.access_token;
    console.log(accessTokenValue);

    if (!token) {
      console.error("User token not found in localStorage");
      return;
    }

    try {
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
    } catch (error) {
      console.error(
        "Error fetching personal info:",
        error.response.data.message
      );
      // alert(`${error.response.data.message}`);

      if (error.response && error.response.status === 422) {
        console.error("Unprocessable Entity: ", error.response.data);
      } else {
      }
    }
  };

  useEffect(() => {
    console.log("Fetching personal info...");
    fetchPersonalInfo();
  }, []);

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
          // Update with other fields as needed
        });

        // Retrieve and set the cached photo from local storage
        const cachedPhoto = localStorage.getItem("profilePhoto");
        if (cachedPhoto) {
          setSelectedFile(
            new File([new Blob([cachedPhoto])], "profilePhoto.png", {
              type: "image/png",
            })
          );
        }
      } catch (error) {
        console.error("Error fetching personal info:", error.response);
        if (error.response && error.response.status === 422) {
          // Handle validation errors if needed
        } else {
          // Handle other errors
        }
      }
    };

    fetchPersonalInfo();
  }, []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    // Call handleUpload when the selectedFile state changes
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]);

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected for upload");
      return;
    }
  
    const token = localStorage.getItem("user-info");
    const tokenObject = JSON.parse(token);
    const accessTokenValue = tokenObject.access_token;
  
    const formData = new FormData();
    formData.append("user_img", selectedFile);
  
    try {
      const response = await axios.put(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/update_img",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Axios Response:", response);
  
      // Save the uploaded file information in local storage
      const imageUrl = response.data.url;
      localStorage.setItem("profilePhoto", imageUrl);
      console.log("File uploaded successfully. Image URL:", imageUrl);
  
      // Update the UI to reflect the changes
      setSelectedFile(null); // Reset selectedFile after successful upload
  
      // Send the photo URL to the API
      await axios.post(
        "https://your-api-url/upload-photo-url",
        { photoUrl: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
          },
        }
      );
  
      console.log("Photo URL sent to API successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    }
  };
  
  

  useEffect(() => {
    // Load photo from local storage
    const cachedPhotoUrl = localStorage.getItem("profilePhoto");
  
    console.log("Cached Photo URL:", cachedPhotoUrl);
  
    if (cachedPhotoUrl) {
      // Create a File object from the cached photo URL
      const fileName = "profilePhoto.png";
      fetch(cachedPhotoUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], fileName, { type: "image/png" });
          setSelectedFile(file);
        })
        .catch((error) => {
          console.error("Error creating File object:", error);
        });
    }
  }, []);
  

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const validateNewPassword = (value) => {
    if (!regex.test(value)) {
      setNewPasswordError(
        "Şifrədə ən azı bir kiçik hərf, bir böyük hərf, bir xüsusi simvol və ən azı 8 simvol uzunluğunda olmalıdır"
      );
      console.log("password sehvdi");
      return false;
    } else {
      setNewPasswordError("");
      console.log("password duzdu");

      return true;
    }
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
  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !validateNewPassword(newPassword) ||
      !validateConfirmPassword(confirmPassword)
    ) {
      return;
    }

    const token = localStorage.getItem("user-info");
    const tokenObject = JSON.parse(token);
    const accessTokenValue = tokenObject.access_token;

    try {
      const response = await axios.put(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/changePassword",
        {
          old_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
          },
        }
      );

      console.log("Request:", response.config);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile. Please try again.");
    }

    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordError("");
    message.success("Profile updated successfully");
  };

  // const handleChange = () => {
  //   const inputElement = document.createElement("input");
  //   inputElement.type = "file";
  //   inputElement.style.display = "none";

  //   inputElement.addEventListener("change", (event) => {
  //     handleUpload(event);
  //   });

  //   document.body.appendChild(inputElement);
  //   inputElement.click();
  //   document.body.removeChild(inputElement);
  // };

  // const handleRemove = async () => {
  //   // Existing code...

  //   try {
  //     // Add logic to send a request to remove the photo from the server
  //     await axios.put(
  //       "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/remove_img",
  //       {}, // Pass an empty object or appropriate data for removal
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessTokenValue}`,
  //         },
  //       }
  //     );

  //     console.log("User image removed successfully");
  //     // Handle any additional logic or UI changes after image removal

  //     // Remove the profile photo from local storage
  //     setSelectedFile(null);
  //     localStorage.removeItem("profilePhoto");
  //   } catch (error) {
  //     console.error("Error removing user image:", error);
  //     // Handle error
  //   }
  // };


  const handleRemove = async () => {
    const token = localStorage.getItem("user-info");
    const tokenObject = JSON.parse(token);
    const accessTokenValue = tokenObject.access_token;

    try {
      await axios.put(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/remove_img",
        {}, // Pass an empty object or appropriate data for removal
        {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
          },
        }
      );

      console.log("User image removed successfully");
      // Handle any additional logic or UI changes after image removal
    } catch (error) {
      console.error("Error removing user image:", error);
      // Handle error
    }
  };

  // Fetch favorite words and sentences
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

  const handleFileInputChange = () => {
    fileInputRef.current.click();
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
            className="circular"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundImage: selectedFile
                ? `url("${URL.createObjectURL(selectedFile)}")`
                : 'url("https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg")',
              backgroundColor: selectedFile
                ? ""
                : "/* default background color */",
              backgroundSize: selectedFile ? "cover" : "",
            }}
          />

          <div className="user_name">{personalInfo.fullName}</div>
        </div>

        <Col>
          <div className="profile-photo-buttons">
            <Row>
              {!selectedFile && (
                <label className="button-profile-photo">
                  Şəkil yükləyin{" "}
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </label>
              )}
              {selectedFile && (
                <button
                  className="change-button"
                  onClick={handleFileInputChange}
                >
                  Şəkili dəyişdir
                </button>
              )}
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </Row>
            {selectedFile && (
              <Row>
                <button className="button-profile-photo" 
                onClick={handleRemove}>
                  Şəkili silin
                </button>
              </Row>
            )}
          </div>
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
                  <Col xs={12} sm={12} md={16} lg={18} xl={18}>
                    <Form.Item
                      name="currentPass"
                      label="Köhnə şifrə"
                      style={{ width: "100%" }}

                      rules={[
                        {
                          required: true,
                          message: "Zəhmət olmasa mövcut şifrənizi daxil edin!",
                        },
                      ]}
                    >
                      <Input.Password
                        className="profile-input edit-input"
                        style={{ width: "100%"}}
                        placeholder="Köhnə şifrəni daxil edin!"
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                      />
                    </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="newPass" style={{ marginBottom: "20px" }}>
                <Row>
                  <Col xs={12} sm={12} md={16} lg={18} xl={18}>
                  <Form.Item
                    name="newPassword"
                    label="Yeni şifrə"
                    style={{ width: "100%" }}
                    hasFeedback
                    validateStatus={
                      newPasswordError || confirmPasswordError ? "error" : ""
                    }
                    help={newPasswordError || confirmPasswordError}
                    rules={[
                      {
                        required: true,
                        message: "Zəhmət olmasa yeni şifrə daxil edin!",
                      },
                      { validator: (_, value) => validateNewPassword(value) },
                    ]}
                  >
                    <Input.Password
                      className="profile-input edit-input"
                      style={{ width: "97%", marginLeft:"12px"}}
                      placeholder="Yeni şifrəni daxil edin!"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      onBlur={() => {
                        validateNewPassword(newPassword);
                        validateConfirmPassword(confirmPassword);
                      }}
                    />
                  </Form.Item>
                  </Col>
                  </Row>
                  </div>

                  <Row>
                  <Col xs={12} sm={12} md={16} lg={18} xl={18}>
                  <Form.Item
                    name="confirmPassword"
                    label="Təsdiq şifrə"
                    style={{ width: "100%" }}

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
                      style={{ width: "100%" }}
                      placeholder="Təsdiq şifrəni daxil edin"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        validateConfirmPassword(e.target.value);
                      }}
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
            xs={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 12, offset: 0 }}
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
                xs={{ span: 24, offset: 0 }}
                md={{ span: 24, offset: 0 }}
                lg={{ span: 24, offset: 0 }}
                xl={{ span: 12, offset: 0 }}
              ></Col>
            )}

            {/* Display favorite sentences */}
            {favoriteSentences && favoriteSentences.length > 0 && (
              <Col
                className="second-frame"
                xs={{ span: 24, offset: 0 }}
                md={{ span: 24, offset: 0 }}
                lg={{ span: 24, offset: 0 }}
                xl={{ span: 12, offset: 0 }}
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
