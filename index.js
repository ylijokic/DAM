// get the client
const mysql = require('mysql2');

// create the connection to database
//Password is left empty
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dam'
});

//Query to Select all from Asset Table.
connection.connect(function(err) {
  if (err) throw err;
  connection.query('SELECT * FROM `asset`', function(err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
