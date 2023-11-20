// Get references to the file input and the image element
const fileInput = document.getElementById('fileInput');
const uploadedImage = document.getElementById('uploadedImage');
const itemCategorySelect = document.getElementById('itemCategory'); // Access the dropdown

let tags = "";
let link = "";
let uniqueId = "ID " + Date.now();
let itemCategory = "";


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
    let tagsArray = labels.map(label => label.description);
    tags = tagsArray.join(" ");

    console.log("Tags: " + tags);

  })
  .catch(error => {
      console.error('Error calling Google Vision API:', error);
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

fileInput.addEventListener('change', (event) => {
  const selectedFile = event.target.files[0];
  const selectedItemCategory = itemCategorySelect.value; // Get the selected category

  if (selectedFile) {
      // Process the selected file

      // You can use the selectedItemCategory value here to include it in the metadata upload
      itemCategory = selectedItemCategory;
      console.log('Selected Category:', selectedItemCategory);

      // For example, if you're using a function to upload metadata:
      // uploadMetadata(selectedFile, selectedItemCategory);
  }
});
