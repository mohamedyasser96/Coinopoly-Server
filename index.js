const express = require('express')

// Initialize http server
const app = express();

// Handle / route
app.get('/Hello', (req, res) =>
  res.send('Ouffi says, Hello World!')
)

// Launch the server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
