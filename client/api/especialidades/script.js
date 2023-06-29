fetch('/api/getespecialidades/')
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Request failed with status code ' + response.status);
    }
  })
  .then(function(data) {
    displayData(data);
  })
  .catch(function(error) {
    console.error('Request failed:', error);
  });

function displayData(data) {
  var container = document.getElementById('data-container');
  container.textContent = JSON.stringify(data);
}