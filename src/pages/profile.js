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
import PasswordChangeComponent from "../components/profile-page/PasswordChangeComponent.js.js";
import FavBox from "../components/profile-page/fav-box.js";
import Layout from "../components/Layout/layout.js";
import "../assets/profile.css";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Profile = () => {
  const handleLoginSubmit = (values) => {
    console.log("Login form values:", values);
  };

  const handleRegisterSubmit = (values) => {
    console.log("Register form values:", values);
  };

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
            Authorization: `Bearer ${accessTokenValue}`,
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
       {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
          </div>
        ) : (
          <div className="body-margin">
        <Row  className="justify-content-between mt-5 profile-image-row">
          <Col
            sm={{ span: 24, offset: 0 }}
           xs={{ span: 24, offset: 0 }}
           md={{ span: 8, offset: 0 }}
           lg={{ span: 8, offset: 0 }}
           xl={{ span: 4, offset: 0 }}
           className="mb-5"
          
          >
            <ImageUploadComponent
              accessTokenValue={accessTokenValue}
              personalInfo={personalInfo}
            />
            <Row justify="center">
              <Col>{/*favbox*/}</Col>
              <Col>
                <div
                  className="profile-exit-icon"
                  
                  style={{ width: "100%", height: "100%", color: "#2B2676" ,  cursor:"pointer"}}
                  onClick={showLogoutModal}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </div>

                <Modal
                  title="Çıxışı təsdiqlə"
                  visible={logoutModalVisible}
                  onCancel={() => setLogoutModalVisible(false)}
                  footer={[
                    <Button
                      key="cancel"
                      onClick={() => setLogoutModalVisible(false)}
                    >
                      Ləğv et
                    </Button>,
                    <Button
                      key="logout"
                      type="primary"
                      danger
                      onClick={handleLogout}
                    >
                      Çıxış et
                    </Button>,
                  ]}
                >
                  Çıxmaq istədiyinizə əminsiniz?
                </Modal>
              </Col>
            </Row>
          </Col>
          <Col className="mb-5"
            sm={{ span: 24, offset: 0 }}

            xs={{ span: 24, offset: 0 }}
            md={{ span: 16, offset: 0 }}
            lg={{ span: 16, offset: 0 }}
            xl={{ span: 10, offset: 0 }}
          >
            {/* <Row className="profile-box">
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
                    xs={{ span: 8, offset: 0 }}
                    md={{ span: 8, offset: 0 }}
                    lg={{ span: 8, offset: 0 }}
                    xl={{ span: 8, offset: 0 }}
                  >
                    Ad Soyad
                  </Col>
                  <Col
                    className="custom-col1"
                    xs={{ span: 4, offset: 0 }}
                    md={{ span: 4, offset: 0 }}
                    lg={{ span: 4, offset: 0 }}
                    xl={{ span: 4, offset: 0 }}
                  >
                    :
                  </Col>
                  <Col
                    className="custom-col1"
                    xs={{ span: 6, offset: 0 }}
                    md={{ span: 6, offset: 0 }}
                    lg={{ span: 6, offset: 0 }}
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
                  <PasswordChangeComponent
                    accessTokenValue={accessTokenValue}
                  />
                </Row>
              </Col>
            </Row> */}

            <Tabs defaultActiveKey="1" className="tab-border" >
              <TabPane tab="Haqqında" key="1">
                {/* <Form onFinish={handleLoginSubmit}>
          <Form.Item
            label="Email address"
            name="email"
            rules={[{ required: true, message: 'Please input your email address!' }]}
          >
            <Input placeholder="Email address" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form> */}
                <div class="col-sm-12">
                  <div class="card-block">
                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                      İstifadəçi haqqında
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600 profile-p">Elektron Adress</p>
                        <h6 class="text-muted f-w-400">{personalInfo.emailAddress}</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600 profile-p">İstifadəçi adı</p>
                        <h6 class="text-muted f-w-400"> {personalInfo.username}</h6>
                      </div>
                      <div class="col-sm-6 mt-3">
                        <p class="m-b-10 f-w-600 profile-p">Ad Soyad</p>
                        <h6 class="text-muted f-w-400">  {personalInfo.fullName}</h6>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Şifrəni Dəyiş" key="2">
              <PasswordChangeComponent
                    accessTokenValue={accessTokenValue}
                  />
                {/* <Form onFinish={handleRegisterSubmit}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Email address"
            name="email"
            rules={[{ required: true, message: 'Please input your email address!' }]}
          >
            <Input placeholder="Email address" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Verify Password"
            name="verifyPassword"
            rules={[{ required: true, message: 'Please verify your password!' }]}
          >
            <Input.Password placeholder="Verify Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form> */}
              </TabPane>
            </Tabs>
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 8, offset: 0 }}
          >
            <FavBox
              favoriteWords={favoriteWords}
              favoriteSentences={favoriteSentences}
            />
          </Col>

          {/* <Row className="fav-box">
        <FavBox
          favoriteWords={favoriteWords}
          favoriteSentences={favoriteSentences}
        />
      </Row> */}
        </Row>
      </div>
        )}
      
    </Layout>
  );
};

export default Profile;