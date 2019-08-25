module.exports = () => {
  const express = require('express');
  const router = express.Router();

  //Insert an asset
  router.get('/addasset', (req, res) => {
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

  //Route to Select all assets in database
  router.get('/getassets', (req, res) => {
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
  router.get('/getasset/:id', (req, res) => {
    let sql = `SELECT * FROM asset WHERE id = ${req.params.id} `;
    let query = connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.send(JSON.stringify(result));
    });
  });

  // Route to Update asset name in database
  router.get('/updateasset/:id', (req, res) => {
    let newName = 'Updated_Asset_Name!';
    let sql = `UPDATE asset SET name = '${newName}' WHERE id = ${req.params.id}`;
    let query = connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    });
  });

  //Delete asset from database
  router.get('/deleteasset/:id', (req, res) => {
    let sql = `DELETE FROM asset WHERE id = ${req.params.id}`;
    let query = connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    });
  });

  return router;
};
