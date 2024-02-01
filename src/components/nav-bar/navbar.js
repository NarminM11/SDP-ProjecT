import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Input } from "antd";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import "./navbar.css";

function Navbar() {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("AZ");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openBasic, setOpenBasic] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();



  // const isDictionaryPage = location.pathname === "/dictionary";


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    setDropdownOpen(false);
  };

   useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('user-info');

      if (authToken) {
        try {
          const tokenObject = JSON.parse(authToken);
          const accessTokenValue = tokenObject.access_token;
          console.log(accessTokenValue);

        

          const response = await axios.get(
            'https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/info',
            {
              headers: {
                Authorization: `Bearer ${accessTokenValue}`,
              },
            }
          );
  setIsLoggedIn(true);
          setProfilePictureUrl(
            response.data.user_info.user_img || '/media/pics/demo-user.jpg'
          );
          console.log("dabase");
        
        } catch (error) {
          // console.error('Error decoding token:', error.message);

          // Handle token expiration
          if (error.response && error.response.status === 401) {
            // setIsLoggedIn(false);
            console.log("ishledi");
            // Token expired, remove from local storage and navigate to home
            localStorage.removeItem('user-info');
            navigate('/home');
          }
        }
      }

    };

    fetchData();
  }, []);
  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    toast.success("Logged out successfully!", { autoClose: 2000 });
    setTimeout(() => {
      navigate("/home");
      window.location.reload();
    }, 2000);
  };

  //   const isLoggedIn = false;
  //   useEffect(() => {
  //     const authToken = localStorage.getItem('authToken');
  //     setIsLoggedIn(!!authToken);

  //     if (authToken) {
  //         const decodedToken = jwtDecode(authToken);
  //         const profilePictureName = decodedToken.imageUrl || "avatar.jpg";
  //         const fullProfilePictureUrl = `./images/users/${profilePictureName}`;

  //         setProfilePictureUrl(fullProfilePictureUrl);
  //         console.log(decodedToken);

  //         const jwt = require('jsonwebtoken');
  //         // Your JWT token
  //         const token =  localStorage.getItem('authToken');
  //         try {
  //           // Decode the token
  //           const decodedToken = jwt.verify(token);
  //           // Access the decoded information
  //           console.log(decodedToken);
  //         } catch (error) {
  //           console.error('Error decoding token:', error.message);
  //         }

  //     }
  // }, []);
  const scrollToAboutSection = (event) => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <a href="/home">
            <img src="/logo.jpg" height="30" alt="" loading="lazy" />
            <span style={{ fontWeight: "bold", color: "#2b2676" }}>
              Jest Dili
            </span>
          </a>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="justify-content-end mr-auto mb-2 mb-lg-0">
        
               
          
              <MDBNavbarNav className="justify-content-end mr-auto mb-2 mb-lg-0">
                <MDBNavbarItem>
                  <MDBNavbarLink
                    style={{ color: "#2b2676" }}
                    active
                    aria-current="page"
                    href="/home"
                  >
                    Ana Səhifə
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    active
                    aria-current="page"
                    style={{ color: "#2b2676" }}
                    href="/home#about-section"
                    onClick={scrollToAboutSection} 

                  >
                    Haqqında
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    style={{ color: "#2b2676" }}
                    active
                    aria-current="page"
                    href="/dictionary"
                  >
                    Lüğət
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    style={{ color: "#2b2676" }}
                    active
                    aria-current="page"
                    href="/blog"
                  >
                    Bloq
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    style={{ color: "#2b2676" }}
                    active
                    aria-current="page"
                    href="/contact"
                  >
                    Əlaqə
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBDropdown>
                    <MDBDropdownToggle
                      style={{ color: "#2b2676" }}
                      tag="a"
                      className="nav-link"
                      role="button"
                      onClick={toggleDropdown}
                    >
                      {selectedLanguage}
                    </MDBDropdownToggle>
                    {isDropdownOpen && (
                      <MDBDropdownMenu className="">
                        <MDBDropdownItem
                          style={{ color: "#2b2676" }}
                          link
                          onClick={() => changeLanguage("AZ")}
                        >
                          Azərbaycan
                        </MDBDropdownItem>
                        <MDBDropdownItem
                          style={{ color: "#2b2676" }}
                          link
                          onClick={() => changeLanguage("EN")}
                        >
                          İngilis
                        </MDBDropdownItem>
                        <MDBDropdownItem
                          style={{ color: "#2b2676" }}
                          link
                          onClick={() => changeLanguage("RU")}
                        >
                          Rus
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    )}
                  </MDBDropdown>
                </MDBNavbarItem>
              </MDBNavbarNav>
            
          </MDBNavbarNav>

          {isLoggedIn ? (
            <div className="profile-section">
              <a href="/profile">
                <div className="profile-picture">
                  <div
                    className="circular "
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      border: "1px solid #2b2676",

                      background: profilePictureUrl
                        ? `url("${profilePictureUrl}") center/cover`
                        : 'url("https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg") center/cover',
                      backgroundSize: profilePictureUrl ? "cover" : "",
                    }}
                  />
                  {/* <img
                 style={{
                   width: "50px",
                   height: "50px",
                   backgroundImage: `url(${profilePictureUrl ?? 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'})`,
                   backgroundSize: profilePictureUrl ? 'cover' : '',
                 }}
                 alt="Profile"
               /> */}
                </div>
              </a>
            </div>
          ) : (
            <>
              <div className="d-flex input-group w-auto">
                <div className="navbar-login-signup navbar-login">
                  <MDBNavbarLink active aria-current="page" href="/login">
                    Giriş
                  </MDBNavbarLink>
                  <span></span>
                </div>
                <div className="navbar-login-signup navbar-signup">
                  <MDBNavbarLink active aria-current="page" href="/signup">
                    Qeydiyyat
                  </MDBNavbarLink>
                </div>
              </div>
              {/* ... other login/signup div ... */}
            </>
          )}

        
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;