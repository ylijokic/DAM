const express = require('express');
const mysql = require('mysql2');

//Create connection to express
const app = express();

// create the connection to database

/****Password is left empty****/
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dam'
});

app.use('/user', require('./user'));
app.use('/asset', require('./asset'));
app.use('/folder', require('./folder'));

//Check Database Connection
connection.connect(err => {
  if (err) throw err;
  // console.log(result);
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
