const express = require('express');
const app = express();

const mysql = require('./dbconn');

//Router Modules
const user = require('./routes/user');
const asset = require('./routes/asset');
const folder = require('./routes/folder');

//Load Router Modules in App
app.use('/user', user);
app.use('/asset', asset);
app.use('/folder', folder);

//Load Database into App
app.set('mysql', mysql);

app.use(function(req, res) {
  res.status(404);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
