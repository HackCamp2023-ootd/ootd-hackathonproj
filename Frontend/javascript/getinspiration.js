document.getElementById('startButton').addEventListener('click', (event) => {
    event.preventDefault();
  
    fetch('/startPipeline', { method: 'GET' })
      .then(async response => {
        const resp = await response.json();
        console.log(resp)
        if (resp.success) {
          console.log("GOING TO DISPLAY FUNCTION")
          displayImage(resp.outputs);
        } else {
          console.error(resp.error)
        }
      })
      .then(data => {
        pollStatus(data.runId);
      })
      .catch(error => console.error('Error:', error));
  });
  
  function displayImage(outputs) {
    // Assuming the image URL is in the outputs object
    // Adjust this part according to how the outputs are structured
    const imageUrl = outputs.image_link; // Replace 'imageURL' with the actual key
    document.getElementById('imageContainer').src = imageUrl;
    console.log("DISPLAYED IMAGE");
  }