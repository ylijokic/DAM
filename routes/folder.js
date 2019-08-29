const express = require('express');
const router = express.Router();

//Helper function to Select all folders
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

//Helper function to Select a single folder
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

//GET request to Select all folders in database
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

//GET request to Select a single folder from database
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

// POST request to insert a folder
router.post('/', (req, res) => {
  let mysql = req.app.get('mysql');
  let sql = 'INSERT INTO folder (name, creator) VALUES (?, ?)';
  let inserts = [req.body.name, req.body.creator];
  sql = mysql.pool.query(sql, inserts, (err, result) => {
    if (err) {
      res.write(JSON.stringify(err));
      res.end();
    } else {
      res.redirect('/folder');
    }
  });
});

// PUT request to Update folder in database
router.put('/:id', function(req, res) {
  let mysql = req.app.get('mysql');
  // console.log(req.body)
  // console.log(req.params.id)
  let sql = 'UPDATE folder SET name=?, creator=? WHERE id=?';
  let inserts = [req.body.name, req.body.creator, req.params.id];
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

// DELETE request to Delete a folder from database
router.delete('/:id', function(req, res) {
  let mysql = req.app.get('mysql');
  let sql = 'DELETE FROM folder WHERE id=?';
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
