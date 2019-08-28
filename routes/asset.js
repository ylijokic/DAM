const express = require('express');
const router = express.Router();

function getAssets(res, mysql, context, complete) {
  mysql.pool.query('SELECT * FROM asset', function(err, results, fields) {
    if (err) {
      res.write(JSON.stringify(err));
      res.end();
    }
    context.asset = results;
    complete();
  });
}

function getSingleAsset(res, mysql, context, id, complete) {
  let sql = `SELECT * FROM asset WHERE id = ?`;
  let inserts = [id];
  mysql.pool.query(sql, inserts, (err, results, fields) => {
    if (err) {
      res.write(JSON.stringify(err));
      res.end();
    }
    context.asset = results;
    complete();
  });
}

// //Insert an asset
// router.get('/addasset', (req, res) => {
//   let asset = {
//     name: 'important_asset',
//     physical_file_name: 'important.pdf',
//     uploader: 3,
//     physical_file_size: 5,
//     physical_file_type: 'pdf'
//   };
//   let sql = 'INSERT INTO asset SET ?';
//   let query = connection.query(sql, asset, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(result.insertId);
//   });
// });

//Route to Select all assets in database
router.get('/', (req, res) => {
  let callBackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  getAssets(res, mysql, context, complete);
  function complete() {
    callBackCount++;
    if (callBackCount >= 1) {
      res.send(context);
    }
  }
});

//Route to Select a single asset from database
router.get('/:id', (req, res) => {
  let callBackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  getSingleAsset(res, mysql, context, req.params.id, complete);
  function complete() {
    callBackCount++;
    if (callBackCount >= 1) {
      res.send(context);
    }
  }
});

// // Route to Update asset name in database
// router.get('/update/:id', (req, res) => {
//   let newName = 'Updated_Asset_Name!';
//   let sql = `UPDATE asset SET name = '${newName}' WHERE id = ${req.params.id}`;
//   let query = connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(JSON.stringify(result));
//   });
// });

// //Delete asset from database
// router.get('/delete/:id', (req, res) => {
//   let sql = `DELETE FROM asset WHERE id = ${req.params.id}`;
//   let query = connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(JSON.stringify(result));
//   });
// });

module.exports = router;