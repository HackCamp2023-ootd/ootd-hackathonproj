export const processImage = async (imageFile) => {
  // Implement the logic to process the image.
  // For example, sending it to a server or an external API.
  const formData = new FormData();
  formData.append('image', imageFile);

  // Replace this URL with your actual API endpoint
  const response = await fetch('http://your-api-endpoint.com/process-image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  console.log("successfully uploaded");

  return response.json();
};
