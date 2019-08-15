const express = require('express');
const mysql = require('mysql2');

// create the connection to database
//Password is left empty
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mylomylo',
  database: 'dam'
});

//Check Database Connection
connection.connect(err => {
  if (err) throw err;
  // console.log(result);
});

//Create connection to express
const app = express();

/*QUERIES TO INSERT DATA INTO DATABASE*/

// Insert a hard-coded user
app.get('/adduser', (req, res) => {
  let user = { email: 'user2@gmail.com', pw: 'userPassword!' };
  let sql = 'INSERT INTO user SET ?';
  let query = connection.query(sql, user, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result.insertId);
  });
});

//Insert an asset
app.get('/addasset', (req, res) => {
  let asset = {
    name: 'important_asset',
    physical_file_name: 'important.pdf',
    uploader: 3,
    physical_file_size: 5,
    physical_file_type: 'pdf'
  };
  let sql = 'INSERT INTO asset SET ?';
  let query = connection.query(sql, asset, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result.insertId);
  });
});

//Insert a folder
app.get('/addfolder', (req, res) => {
  let folder = {
    name: 'folder_for_important_things',
    creator: 3
  };
  let sql = 'INSERT INTO folder SET ?';
  let query = connection.query(sql, folder, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result.insertId);
  });
});

/*QUERIES TO READ DATA FROM DATABASE*/

//Route to Select all users in database
app.get('/getusers', (req, res) => {
  let sql = 'SELECT * FROM user';
  let query = connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send(JSON.stringify(results));
  });
});

//Route to Select a single user from database
app.get('/getuser/:id', (req, res) => {
  let sql = `SELECT * FROM user WHERE id = ${req.params.id} `;
  let query = connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

//Route to Select all assets in database
app.get('/getassets', (req, res) => {
  let sql = 'SELECT * FROM asset';
  let query = connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send(JSON.stringify(results));
  });
});

//Route to Select a single asset from database
app.get('/getasset/:id', (req, res) => {
  let sql = `SELECT * FROM asset WHERE id = ${req.params.id} `;
  let query = connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

//Route to Select all folders in database
app.get('/getfolders', (req, res) => {
  let sql = 'SELECT * FROM folder';
  let query = connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(JSON.stringify(results));
  });
});

//Route to Select a single folder from database
app.get('/getfolder/:id', (req, res) => {
  let sql = `SELECT * FROM folder WHERE id = ${req.params.id} `;
  let query = connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

/*QUERIES TO UPDATE DATA IN DATABASE*/

// Route to Update user password in database
app.get('/updateuser/:id', (req, res) => {
  let newPassword = 'Updated_Password!';
  let sql = `UPDATE user SET pw = '${newPassword}' WHERE id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

// Route to Update asset name in database
app.get('/updateasset/:id', (req, res) => {
  let newName = 'Updated_Asset_Name!';
  let sql = `UPDATE asset SET name = '${newName}' WHERE id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

// Route to Update asset name in database
app.get('/updatefolder/:id', (req, res) => {
  let newName = 'Updated_Folder_Name!';
  let sql = `UPDATE folder SET name = '${newName}' WHERE id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

/*QUERIES TO DELETE DATA IN DATABASE*/

// Delete user from database
app.get('/deleteuser/:id', (req, res) => {
  let sql = `DELETE FROM user WHERE id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

//Delete asset from database
app.get('/deleteasset/:id', (req, res) => {
  let sql = `DELETE FROM asset WHERE id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

//Delete folder from database
app.get('/deletefolder/:id', (req, res) => {
  let sql = `DELETE FROM folder WHERE id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
