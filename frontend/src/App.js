import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', caption);

    try {
      const response = await fetch('http://localhost:4000/postToInstagram', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert('Uploaded successfully: ' + result.message);
      } else {
        alert('Failed to upload');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error posting the file');
    }
  };

  return (
    <div className="App">
      <form className="upload-form" onSubmit={handleSubmit}>
        <h1>AI Social Media Manager</h1>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <textarea
          placeholder="Enter a caption..."
          value={caption}
          onChange={handleCaptionChange}
        ></textarea>
        <button type="submit">Post to Instagram</button>
      </form>
    </div>
  );
}

export default App;
