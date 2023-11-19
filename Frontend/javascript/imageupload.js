// Get references to the file input and the image element
const fileInput = document.getElementById('fileInput');
const uploadedImage = document.getElementById('uploadedImage');
let tags = [];
let link = "";


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
      // console.log('Google Vision API Response:', data);
      // Process the response data as needed
    let labels = data.responses[0].labelAnnotations;
    tags = labels.map(label => label.description);

    console.log("Tags: " + tags);

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

// Helper Function to Upload to S3
function uploadToS3() {
    // Replace with your AWS configuration
    AWS.config.update({
        accessKeyId: 'AKIASJDXDX2NSGH2VKB7',
        secretAccessKey: 'cxwtKJyfK+rfBJkYTAXb7KN9WqjSPCJxtinhI7c/',
        region: 'us-east-1'
    });

    const fileS3 = fileInput.files[0];

    if (!fileS3) {
        alert('Please select a file to upload.');
        return;
    }

    const s3 = new AWS.S3();
    const bucketName = 'smart-closet-ootd-hackcamp';
    const key = `uploads/${Date.now()}_${fileS3.name}`;

    s3.upload({
        Bucket: bucketName,
        Key: key,
        Body: fileS3,
        ACL: 'public-read' // Make the uploaded file public
    }, (err, data) => {
        if (err) {
            console.error('Error uploading file:', err);
            alert('Error uploading file. Please try again later.');
        } else {
            console.log('File uploaded successfully:', data);
            alert('File uploaded successfully! You can access it at: ' + data.Location);
        }
    });

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
