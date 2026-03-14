const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the public folder
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
