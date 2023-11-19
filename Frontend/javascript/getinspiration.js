document.getElementById('startButton').addEventListener('click', () => {
    fetch('/startPipeline', { method: 'POST' })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('Error:', error));
  });