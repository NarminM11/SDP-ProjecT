import React, { useState, useEffect } from "react";

const ImageUploadAndUserInfo = ({ token }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    username: "",
    emailAddress: "",
    profileImage: "",
  });

  useEffect(() => {
    // Fetch user info when the component mounts
    fetchUserInfo();
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setUpdatedImage(selectedImage);
  };

  const handleImageUpload = async () => {
    try {
      if (!updatedImage) {
        console.error("Please select an image to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("image", updatedImage);

      const response = await fetch(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/upload-image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Image uploaded successfully");
        // After successful upload, update the current image
        setCurrentImage(updatedImage);
        // Fetch user info to get updated profile image URL
        fetchUserInfo();
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(
        "https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/info",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setUserInfo({
          fullName: result.user_info.user_name,
          username: result.user_info.user_username,
          emailAddress: result.user_info.user_email,
          profileImage: result.user_info.user_img,
        });
        // Set the current image when fetching user info
        setCurrentImage(result.user_info.user_img);
      } else {
        console.error("Error fetching user info:", response.statusText);
      }
    } catch (error) {
      console.error("Error during user info fetch:", error);
    }
  };

  return (
    <div>
      <h2>Image Upload and User Info</h2>
      <div>
        <label>
          Select Image:
          <input type="file" onChange={handleImageChange} accept="image/jpeg, image/png" />
        </label>
        <button onClick={handleImageUpload}>Upload Image</button>
      </div>
      <div>
        <h3>User Info</h3>
        <p>Full Name: {userInfo.fullName}</p>
        <p>Username: {userInfo.username}</p>
        <p>Email: {userInfo.emailAddress}</p>
        <img src={userInfo.profileImage} alt="Profile" />
      </div>
    </div>
  );
};

export default ImageUploadAndUserInfo;