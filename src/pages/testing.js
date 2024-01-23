import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [accessTokenValue, setAccessTokenValue] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage('');
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('https://morning-plains-82582-f0e7c891044c.herokuapp.com/user/upload-image', formData, {
        headers: {
          'Authorization': `Bearer ${accessTokenValue}`
        },
      });

      if (response.status === 200) {
        setMessage('Upload successful');
        // Additional actions on success
      }
    } catch (error) {
      setMessage('Upload failed: ' + error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      handleFileUpload();
    } else {
      setMessage('Please select a file.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUploadComponent;