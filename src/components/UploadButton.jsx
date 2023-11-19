import React from 'react';
import { processImage } from '../services/processImageAPI';

const UploadButton = () => {
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    // Call the function from processImageAPI.js to process the image
    try {
      const response = await processImage(file);
      console.log(response); // Handle the response as needed
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        style={{ display: 'none' }} 
        id="hidden-file-input"
      />
      <label htmlFor="hidden-file-input" style={{ cursor: 'pointer' }}>
        <button>Upload Image</button>
      </label>
    </div>
  );
};

export default UploadButton;
