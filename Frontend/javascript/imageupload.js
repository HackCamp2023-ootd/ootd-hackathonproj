// Get references to the file input and the image element
const fileInput = document.getElementById('fileInput');
const uploadedImage = document.getElementById('uploadedImage');

// Function to upload the image to the backend
function uploadImageToBackend(file) {
    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append('file', file);

    // Make a POST request to the backend with the file
    fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle success - e.g., displaying a success message or updating the UI
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors here, such as displaying an error message
    });
}

// Add an event listener to the file input to handle file selection
fileInput.addEventListener('change', (event) => {
  event.preventDefault();
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

        // Upload the image to the backend
        uploadImageToBackend(selectedFile);
    }
});
