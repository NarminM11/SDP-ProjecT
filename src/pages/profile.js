import React, { useState, useEffect, createRef, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
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
import ImageUploadComponent from "../components/profile-page/imageUploadComponent.js"; // Adjust the path based on your file structure
import PasswordChangeComponent from "../components/profile-page/PasswordChangeComponent.js";
import FavBox from "../components/profile-page/fav-box.js";
import Layout from "../components/Layout/layout.js";
import "../assets/profile.css";

const Profile = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    username: "",
    emailAddress: "",
  });

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [favoriteWords, setFavoriteWords] = useState([]);
  const [favoriteSentences, setFavoriteSentences] = useState([]);
  const [accessTokenValue, setAccessTokenValue] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [fileInput, setFileInput] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  useEffect(() => {
    // console.log("Fetching personal info...");
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

      // Ensure that profileImage is set here
      setProfileImage(
        response.data.user_info.user_img ||
          "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
      );

      return response.data;
    } catch (error) {
      localStorage.removeItem("user-info");
      toast.success("Logged out successfully!", { autoClose: 2000 });
      setTimeout(() => {
        // navigate("/home");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };
  //     console.error(
  //       "Error fetching personal info:",
  //       error.response?.data.message || error.message
  //     );
  //     throw error;
  //   }
  // };

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
        setError("Failed to fetch personal information");
      }
    };

    fetchPersonalInfo();
  }, []);

  // const history = useHistory();
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("user-info");
  
      if (!token) {
        console.error("User token not found in localStorage");
        return;
      }
  
      const tokenObject = JSON.parse(token);
      const accessTokenValue = tokenObject.access_token;
  
      const response = await axios.delete(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/logout",
        {
          headers: {
            Authorization:  `Bearer ${accessTokenValue}`,
          },
        }
      );
  
      console.log("Logout Response:", response.data);
  
      localStorage.removeItem("user-info");
  
      window.location.href = "/login"; 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  
    setLogoutModalVisible(false);
  };

  return (
    <Layout>
    <Row justify="center">
    <Col xs={24} lg={7} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "start" }}>

        <ImageUploadComponent
          accessTokenValue={accessTokenValue}
          personalInfo={personalInfo}
        />
        
        <Row justify="center">
          <Col>
            <div
              className="profile-exit-icon"
              style={{ width: "100%", height: "100%", color: "#2B2676" }}
              onClick={showLogoutModal}
              >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>

            <Modal
        title="Çıxışı tə"
        visible={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setLogoutModalVisible(false)}>
            Ləğv et
          </Button>,
          <Button key="logout" type="primary" danger onClick={handleLogout}>
            Çıxış et
          </Button>,
        ]}
      >
Çıxmaq istədiyinizə əminsiniz?
      </Modal>

          </Col>
        </Row>
      </Col>
      <Col xs={24} md={24} lg={24} xl={14}>

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
          <Col xs={24} md={24} lg={24} xl={12}>

            <Row justify="center" align="middle" style={{ height: "100%" }}>
              <PasswordChangeComponent accessTokenValue={accessTokenValue} />
            </Row>
          </Col>
        </Row>
        <Col xs={24} md={24} lg={24} xl={12}>

                <Row className="fav-box">

        <FavBox
          favoriteWords={favoriteWords}
          favoriteSentences={favoriteSentences}
        />
              </Row>

</Col>
      </Col>
    </Row>
     </Layout>
  );
};

export default Profile;
