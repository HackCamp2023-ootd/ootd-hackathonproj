// Get references to the file input and the image element
const fileInput = document.getElementById('fileInput');
const uploadedImage = document.getElementById('uploadedImage');


// Helper Function to Call Google Vision API
function analyzeImageWithGoogleVision(imageData) {
  const apiKey = 'AIzaSyCxpTRpoep0JDpdck5CScU38H7H9XF7Qd8';
  const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  const requestBody = {
      requests: [
          {
              image: {
                  content: imageData.split(',')[1] // Assuming imageData is a base64 string with a header
              },
              features: [
                  { type: 'LABEL_DETECTION', maxResults: 10 }
              ],
          },
      ],
  };

  fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Google Vision API Response:', data);
      // Process the response data as needed
  })
  .catch(error => {
      console.error('Error calling Google Vision API:', error);
  });
}


// Helper Function to Upload to S3
function uploadToS3(imageData) {
    // Implement the S3 upload here
    // Note: This can expose your S3 credentials
}


// Function to process the image
function processImage(file) {
    // Convert file to Base64 for the APIs
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;

        // Call the helper functions
        analyzeImageWithGoogleVision(imageData);
        uploadToS3(imageData);

        // Update UI
        uploadedImage.src = imageData; // Display the uploaded image
    };
    reader.readAsDataURL(file);
}

// Event listener for file input
fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        processImage(selectedFile);
    }
});
