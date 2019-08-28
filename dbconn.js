const mysql = require('mysql2');

// create the connection to database

/****Password is left empty****/
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dam'
});

//Check Database Connection
connection.connect(err => {
  if (err) throw err;
  // console.log(result);
});

module.exports.pool = connection;
