import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import {
  faHouse,
  faHeart,
  faBookmark,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/profile.css";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="container">
      <h1>Profile</h1>
      <div className="dropdown">
        <span>AZ</span>
        <FontAwesomeIcon icon={faChevronDown} />
        <div className="dropdown-content">
          <p>ENG</p>
        </div>
      </div>
      <div className="frame1">
        <div className="icons">
          <FontAwesomeIcon icon={faHouse} />
          <FontAwesomeIcon icon={faHeart} />
          <FontAwesomeIcon icon={faBookmark} />
          <FontAwesomeIcon icon={faTag} />
          <FontAwesomeIcon icon={faTag} />
          <FontAwesomeIcon icon={faTag} />
        </div>
        
        <div className="elements">
          <h3>Home</h3>
          <h3>Favorites</h3>
          <h3>Saved Dictionary</h3>
          <h3>Öyrənəcəm</h3>
          <h3>Öyrənirəm</h3>
          <h3>Öyrəndim</h3>
        </div>
      </div>

      <div className="profile">
        <div className="left-profile">
          <h2>Personal Info</h2>
          <p>John Doe</p>
          <p>21</p>
          <p>user@jestdili.az</p>
          <p>+994 55 555 55 55</p>

          <div className="form-container">
            <form>
              <label>Update email address</label>
              <input type="text" name="name" />
            </form>
            <form>
              <label>Current Password</label>
              <input type="text" name="name" />
            </form>
            <form>
              <label>New Password</label>
              <input type="text" name="name" />
            </form>
          </div>
          <button className="save-changes-btn">Save Changes</button>
        </div>

        <div className="right-profile">
          <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Profile"
          />
          <h3>Full Name</h3>
          <label className="save-changes-btn">
            Upload Photo
            <input type="file" style={{ display: "none" }} onChange={handleFileChange} />
          </label>
          <button className="save-changes-btn">Change Photo</button>
          <button className="save-changes-btn" onClick={() => setSelectedFile(null)}>
            Remove Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
