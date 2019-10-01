const express = require('express')

// Initialize http server
const app = express();

const router = require("./router")
const mongoose  = require("mongoose")

mongoose.connect('mongodb://localhost/oufi');

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router);


// Launch the server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
