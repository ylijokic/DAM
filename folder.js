module.exports = () => {
  const express = require('express');
  const router = express.Router();

  //Insert a folder
  router.get('/addfolder', (req, res) => {
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

  //Route to Select all folders in database
  router.get('/getfolders', (req, res) => {
    let sql = 'SELECT * FROM folder';
    let query = connection.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      res.send(JSON.stringify(results));
    });
  });

  //Route to Select a single folder from database
  router.get('/getfolder/:id', (req, res) => {
    let sql = `SELECT * FROM folder WHERE id = ${req.params.id} `;
    let query = connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.send(JSON.stringify(result));
    });
  });

  // Route to Update asset name in database
  router.get('/updatefolder/:id', (req, res) => {
    let newName = 'Updated_Folder_Name!';
    let sql = `UPDATE folder SET name = '${newName}' WHERE id = ${req.params.id}`;
    let query = connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    });
  });

  //Delete folder from database
  router.get('/deletefolder/:id', (req, res) => {
    let sql = `DELETE FROM folder WHERE id = ${req.params.id}`;
    let query = connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    });
  });

  return router;
};
