const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes/index');

const app = express();

app.use(volleyball);
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/data', routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((req, res, next, err) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});

const port = 3005;
app.listen(port, () => {
  console.log('Server is listening on port', port);
});
