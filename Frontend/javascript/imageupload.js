// Get references to the file input and the image element
const fileInput = document.getElementById('fileInput');
const uploadedImage = document.getElementById('uploadedImage');

// Add an event listener to the file input to handle file selection
fileInput.addEventListener('change', (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    // Create a FileReader to read the selected file
    const reader = new FileReader();

    // Add an event listener to the FileReader to handle file reading
    reader.addEventListener('load', (event) => {
      const imageUrl = event.target.result;
      uploadedImage.src = imageUrl; // Display the uploaded image
    });

    // Read the selected file as a data URL (for images)
    reader.readAsDataURL(selectedFile);
  }
});
