const express = require('express');       // Import Express framework
const path = require('path');              // Node module to handle file paths

const app = express();                     // Create express app
const PORT = 8000;                         // Define port number

// Serve static files from 'public' folder (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});