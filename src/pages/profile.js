import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import "../assets/profile.css";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="container">
      <div className="profile-main">
        <div className="side-bar">
          <img
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
          />
          <label className="button-photo">
            Upload Photo
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
          <label className="button-photo">Change Photo</label>
          <label className="button-photo" onClick={() => setSelectedFile(null)}>
            Remove Photo
          </label>
        </div>

        <div className="profile">
          <div className="right-profile">
            <h3>Edit Profile Details</h3>
            <h2>Personal Info</h2>
            <p>full name:John Doe</p>
            <p>age:21</p>
            <p>email address:user@jestdili.az</p>
            <p>phone number:+994 55 555 55 55</p>
          </div>

          <div className="line"></div>
          <div className="form-container">
            <p>Change email address</p>
            <form>
              <label>Update email address</label>
              <input type="text" name="name" />
            </form>
            <p>Change password</p>
            <form>
              <label>Current Password</label>
              <input type="text" name="name" />
            </form>
            <form>
              <label>New Password</label>
              <input type="text" name="name" />
            </form>
            <button className="btn">Cancel</button>

            <button className="btn">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
