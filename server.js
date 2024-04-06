const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

// Middleware to log every request
app.use((req, res, next) => {
  console.log(`[${new Date()}] ${req.method} ${req.url}`);
  next();
});

// Serve the HTML form for adding content to a file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpoint to create or modify a file
app.post('/createFile', (req, res) => {
    const filename = req.query.filename;
    const content = req.query.content;
    
    if (!filename || !content) {
      return res.status(400).send('Filename and content are required');
    }
  
    fs.writeFile(filename, content, (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Error creating or modifying file');
      }
      console.log(`File ${filename} created or modified successfully`);
      res.status(200).send('File created or modified successfully');
    });
  });

// Endpoint to retrieve the content of a file
app.get('/getFile', (req, res) => {
  const filename = req.query.filename;
  if (!filename) {
    return res.status(400).send('Filename parameter is required');
  }

  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(400).send('File not found');
    }
    console.log(`File ${filename} read successfully`);
    res.status(200).send(data);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
