const express = require('express');
const router = express.Router();

function getFolders(res, mysql, context, complete) {
  mysql.pool.query('SELECT * FROM folder', function(err, results, fields) {
    if (err) {
      res.write(JSON.stringify(err));
      res.end();
    }
    context.folder = results;
    complete();
  });
}

function getSingleFolder(res, mysql, context, id, complete) {
  let sql = `SELECT * FROM folder WHERE id = ?`;
  let inserts = [id];
  mysql.pool.query(sql, inserts, (err, results, fields) => {
    if (err) {
      res.write(JSON.stringify(err));
      res.end();
    }
    context.folder = results;
    complete();
  });
}

// //Insert a folder
// router.get('/addfolder', (req, res) => {
//   let folder = {
//     name: 'folder_for_important_things',
//     creator: 3
//   };
//   let sql = 'INSERT INTO folder SET ?';
//   let query = connection.query(sql, folder, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(result.insertId);
//   });
// });

//Route to Select all folders in database
router.get('/', (req, res) => {
  let callBackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  getFolders(res, mysql, context, complete);
  function complete() {
    callBackCount++;
    if (callBackCount >= 1) {
      res.send(context);
    }
  }
});

//Route to Select a single folder from database
router.get('/:id', (req, res) => {
  let callBackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  getSingleFolder(res, mysql, context, req.params.id, complete);
  function complete() {
    callBackCount++;
    if (callBackCount >= 1) {
      res.send(context);
    }
  }
});

// // Route to Update asset name in database
// router.get('/updatefolder/:id', (req, res) => {
//   let newName = 'Updated_Folder_Name!';
//   let sql = `UPDATE folder SET name = '${newName}' WHERE id = ${req.params.id}`;
//   let query = connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(JSON.stringify(result));
//   });
// });

// //Delete folder from database
// router.get('/deletefolder/:id', (req, res) => {
//   let sql = `DELETE FROM folder WHERE id = ${req.params.id}`;
//   let query = connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(JSON.stringify(result));
//   });
// });

module.exports = router;
