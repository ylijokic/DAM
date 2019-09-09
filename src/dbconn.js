const mysql = require('mysql2');
const secrets = require('../secrets.json');

// create the connection to database

/****Password is left empty****/
const connection = mysql.createConnection({
  host: 'localhost',
  user: secrets.MYSQL_USER,
  password: secrets.MYSQL_PASS,
  database: 'dam'
});

//Check Database Connection
connection.connect(err => {
  if (err) throw err;
  // console.log(result);
});

module.exports.pool = connection;
