const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Your Bot Is Ready');
});

function run() {
  app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
  });
}

function keepAlive() {
  run();
}

module.exports = keepAlive;
