const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.json({
    success: true,
    result: 'Hello World',
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
