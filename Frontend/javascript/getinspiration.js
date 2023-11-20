document.getElementById('startButton').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('loadingMessage').style.display = 'block'; // Show loading message
  
    fetch('/startPipeline', { method: 'GET' })
      .then(async response => {
        const resp = await response.json();
        console.log(resp)
        if (resp.success) {
          console.log("GOING TO DISPLAY FUNCTION")
          displayImage(resp.outputs);
        } else {
          console.error(resp.error)
          document.getElementById('loadingMessage').style.display = 'none'; // Hide loading message on error
        }
      })
      .then(data => {
        pollStatus(data.runId);
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('loadingMessage').style.display = 'none'; // Hide loading message on error
      });    
  });
  
  function displayImage(outputs) {
    // Assuming the image URL is in the outputs object
    // Adjust this part according to how the outputs are structured
    const imageUrl = outputs.image_link; // Replace 'imageURL' with the actual key
    document.getElementById('imageContainer').src = imageUrl;
    imageContainer.style.display = 'block'; // Show the image
    document.getElementById('loadingMessage').style.display = 'none'; // Hide loading message
    console.log("DISPLAYED IMAGE");
  }