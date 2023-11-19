import React, { useState } from 'react';

const UploadButton = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }  
  };

  

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="upload-button"
      />
      {selectedImage && (
        <div>
          <p>Preview:</p>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </div>
      )}      
    </div>
  );
};

export default UploadButton;