import React, { useState, useEffect, createRef, useRef  } from "react";
import axios from "axios";
import { message, Button, Col, Row } from "antd";

const ImageUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [accessTokenValue, setAccessTokenValue] = useState("");
  const [error, setError] = useState(null);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    username: "",
    emailAddress: "",
  });

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
  
      // Ensure that profileImage is set here
      setProfileImage(response.data.user_info.user_img || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg");
  
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching personal info:",
        error.response?.data.message || error.message
      );
      throw error;
    }
  };
  

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const token = localStorage.getItem("user-info");
  
        if (!token) {
          console.error("User token not found in localStorage");
          throw new Error("User token not found");
        }
  
        const tokenObject = JSON.parse(token);
        const accessTokenValue = tokenObject.access_token;
  
        setAccessTokenValue(accessTokenValue);
  
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
  
        setProfileImage(response.data.user_info.user_img);
  
      } catch (error) {
        console.error("Error fetching personal info:", error);
        // You can handle the error here, for example, by setting an error state
        setError("Failed to fetch personal information");
      }
    };
  
    fetchPersonalInfo();
  }, []); 

  const fileInputRef = createRef();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    console.log("Selected File:", file);
    setSelectedFile(file);
    setIsImageChanged(true);
    setHasUploadedImage(true);
    setUploadedFileName(file.name); // Update the uploaded file name

  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log("Selected File:", file);
    setSelectedFile(file);
    setIsImageChanged(true);
    setHasUploadedImage(true);
    setUploadedFileName(file.name); // Update the uploaded file name

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
      setProfileImage(
        "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
      );
      setHasUploadedImage(false);
      setUploadedFileName("");
      message.success("Profile image removed successfully");
    } catch (error) {
      console.error("Error removing image:", error);
      message.error("Failed to remove profile image. Please try again.");
    }
  };

  return (
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


      {uploadedFileName && (
        <div className="uploaded-file-name">{uploadedFileName}</div>
      )}

      {hasUploadedImage && (
        <Row justify="center">
          <Col>
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
          </Col>
          <Col>
            <Button
              className="button-profile-photo"
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
          </Col>
        </Row>
      )}

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
      </Row>
    </div>
  );
};

export default ImageUploadComponent;
