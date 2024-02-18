import React, { useState, useEffect, createRef, useRef } from "react";
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
  const [showControls, setShowControls] = useState(true);

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
      setProfileImage(
        response.data.user_info.user_img ||
          "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
      );

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
    setUploadedFileName(file.name);
    setShowControls(true);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log("Selected File:", file);
    setSelectedFile(file);
    setIsImageChanged(true);
    setHasUploadedImage(true);
    setUploadedFileName(file.name);
    setShowControls(true);
  };

  const generateTimestamp = () => new Date().getTime();

  const handleSaveImage = async () => {
    if (!isImageChanged || !selectedFile) {
      return;
    }

    try {
      const timestamp = generateTimestamp();
      const imageUrl = `https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/upload-image?timestamp=${timestamp}`;

      const formData = new FormData();
      formData.append("image", selectedFile);

      setProfileImage(URL.createObjectURL(selectedFile));

      const response = await axios.post(imageUrl, formData, {
        headers: {
          Authorization: `Bearer ${accessTokenValue}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image Upload Response:", response.data);

      message.success("Profil şəkli uğurla yadda saxlanıldı");
      setIsImageChanged(false);
      setUploadedFileName(""); // Clear uploaded file name
      setShowControls(false); // Hide controls after saving
    } catch (error) {
      console.error(
        "Error saving image:",
        error.response?.data || error.message
      );
      message.error("Profil şəklini saxlamaq alınmadı. Zəhmət olmasa bir daha cəhd edin.");
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
      message.success("Profil şəkli uğurla silindi");
    } catch (error) {
      console.error("Error removing image:", error);
      message.error("Profil şəklini silmək alınmadı. Zəhmət olmasa bir daha cəhd edin.");
    }
  };

  return (
    <div style={{ textAlign: "center" }} className="photo-box">
      <div className=" d-flex justify-content-center">
        <div
          key={isImageChanged && selectedFile ? selectedFile : profileImage}
          className="circular position-relative"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            backgroundImage: `url("${
              isImageChanged && selectedFile
                ? URL.createObjectURL(selectedFile) // Use a local URL for the preview
                : profileImage ||
                  "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
            }")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {showControls && hasUploadedImage && (
            <Row
              justify="center"
              style={{ flexDirection: "column", alignItems: "center" }}
            >
              <Col
                className="position-absolute"
                style={{ right: "0px", top: "5px" }}
              >
                <Button
                  style={{ border: "none", backgroundColor: "transparent" }}
                  // className="revert-button"
                  // type="danger"
                  onClick={() => {
                    setHasUploadedImage(false);
                    setUploadedFileName("");
                    setSelectedFile(null);
                    setShowControls(false);
                  }}
                >
                  <img
                    src="https://i.pinimg.com/736x/2f/b9/09/2fb909b74a854f0715e64dda5825990d.jpg"
                    alt=""
                    width="30px"
                    height="30px"
                  />
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </div>

      <div className="user_name">{personalInfo.fullName}</div>
     

      <Row className=" d-flex justify-content-center align-items-center">
        <Col>
          {hasUploadedImage ? (
            <>

            </>
          ) : (
            <>
              <label style={{ cursor:"pointer"}} htmlFor="fileInput">
                <img
                  src="https://w7.pngwing.com/pngs/348/219/png-transparent-gallery-image-picture-ui-photo-user-interface-outline-icon.png"
                  alt=""
                  width="30px"
                  height="30px"
                 
                />
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
        </Col>
        <Col>
          {hasUploadedImage && (
            <>
              <label
                
                htmlFor="fileInput"
                style={{
                  padding:"0px 10px",
                  cursor: "pointer",
                }}
                key={isImageChanged}
              >
                <img
                  src="https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbmdlfGVufDB8fDB8fHww"
                  alt=""
                  width="30px"
                  height="30px"
                />
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
        </Col>
        <Col>
          <Button className="button-profile-photo" onClick={handleRemoveImage}>
            <img src="" alt="" width="30px" height="30px" />
          </Button>
        </Col>
        {showControls && hasUploadedImage && (
        <Row
          justify="center"
          style={{ flexDirection: "column", alignItems: "center" }}
        >
          <Col>
            <Button
              className="button-profile-photo"
              // type="primary"
              onClick={handleSaveImage}
              disabled={!isImageChanged}
              // style={{
              //   height: "40px",
              //   fontSize: "16px",
              //   fontFamily: "Inter",
              //   fontWeight: "400",
              //   marginTop: "8px", // Adjust spacing between buttons if needed
              // }}
            >
              <img
                src="https://w7.pngwing.com/pngs/860/512/png-transparent-instagram-social-media-save-instagram-instagram-save-social-media-logo-icon-thumbnail.png"
                alt=""
                width="30px"
                height="30px"
              />
            </Button>
          </Col>
        </Row>
      )}
      </Row>
    </div>
  );
};

export default ImageUploadComponent;