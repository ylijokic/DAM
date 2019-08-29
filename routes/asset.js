const express = require('express');
const router = express.Router();

//Helper function to Select all assets
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

//Helper function to Select a single asset
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

//GET request to Select all assets in database
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

//GET request to Select a single asset from database
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

// POST request to Create an asset
router.post('/', (req, res) => {
  let mysql = req.app.get('mysql');
  let sql =
    'INSERT INTO asset (name, physical_file_name, uploader, physical_file_size, physical_file_type) VALUES (?, ?, ?, ?, ?)';
  let inserts = [
    req.body.name,
    req.body.fileName,
    req.body.uploader,
    req.body.fileSize,
    req.body.fileType
  ];
  sql = mysql.pool.query(sql, inserts, (err, result) => {
    if (err) {
      res.write(JSON.stringify(err));
      res.end();
    } else {
      res.redirect('/asset');
    }
  });
});

// PUT request to Update asset in database
router.put('/:id', function(req, res) {
  let mysql = req.app.get('mysql');
  // console.log(req.body)
  // console.log(req.params.id)
  let sql =
    'UPDATE asset SET name=?, physical_file_name=?, uploader=?, physical_file_size=?, physical_file_type=? WHERE id=?';
  let inserts = [
    req.body.name,
    req.body.fileName,
    req.body.uploader,
    req.body.fileSize,
    req.body.fileType,
    req.params.id
  ];
  sql = mysql.pool.query(sql, inserts, (err, results) => {
    if (err) {
      res.write(JSON.stringify(error));
      res.end();
    } else {
      res.status(200);
      res.end();
    }
  });
});

// DELETE request to Delete an asset from database
router.delete('/:id', function(req, res) {
  let mysql = req.app.get('mysql');
  let sql = 'DELETE FROM asset WHERE id=?';
  let inserts = [req.params.id];
  sql = mysql.pool.query(sql, inserts, (err, results) => {
    if (err) {
      // console.log(error)
      res.write(JSON.stringify(error));
      res.status(400);
      res.end();
    } else {
      res.end();
    }
  });
});

module.exports = router;
