const filenameInput = document.getElementById('filename');
const contentInput = document.getElementById('content');
const submitButton = document.querySelector('button');

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  const filename = filenameInput.value;
  const content = contentInput.value;

  fetch('http://localhost:8080/createFile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ filename, content })
  })
  .then(response => {
    if (response.ok) {
      alert('File created or modified successfully');
    } else {
      alert('Error creating or modifying file');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error creating or modifying file');
  });
});
