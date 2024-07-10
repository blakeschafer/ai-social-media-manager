import React, { useState } from 'react';
import axios from 'axios';

const InstagramPoster = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [filePath, setFilePath] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFilePath(response.data.filePath);
      alert('File uploaded. Ready to post!');
    } catch (error) {
      alert('Upload failed');
      console.error('Upload Error:', error);
    }
  };

  const postToInstagram = async () => {
    try {
      const response = await axios.post('http://localhost:4000/postToInstagram', {
        filePath,
        caption
      });
      alert('Posted to Instagram successfully');
    } catch (error) {
      alert('Failed to post to Instagram');
      console.error('Post Error:', error);
    }
  };

  return (
    <div>
      <h1>Instagram Poster</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
      <br />
      <textarea value={caption} onChange={handleCaptionChange} placeholder="Enter caption here..." />
      <button onClick={postToInstagram}>Post to Instagram</button>
    </div>
  );
};

export default InstagramPoster;