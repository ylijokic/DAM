const express = require('express');
const router = express.Router();

//Helper function to Select all users
function getUsers(res, mysql, context, complete) {
  mysql.pool.query('SELECT * FROM user', (err, results, fields) => {
    if (err) {
      res.write(JSON.stringify(err));
      res.end();
    }
    context.user = results;
    complete();
  });
}

//Helper function to Select a single user
function getSingleUser(res, mysql, context, id, complete) {
  let sql = `SELECT * FROM user WHERE id = ?`;
  let inserts = [id];
  mysql.pool.query(sql, inserts, (err, results, fields) => {
    if (err) {
      res.write(JSON.stringify(err));
      res.end();
    }
    context.user = results;
    complete();
  });
}

//GET request to Select all users in database
router.get('/', (req, res) => {
  let callBackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  getUsers(res, mysql, context, complete);
  function complete() {
    callBackCount++;
    if (callBackCount >= 1) {
      res.send(context);
    }
  }
});

//GET request to Select a single user from database
router.get('/:id', (req, res) => {
  let callBackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  getSingleUser(res, mysql, context, req.params.id, complete);
  function complete() {
    callBackCount++;
    if (callBackCount >= 1) {
      res.send(context);
    }
  }
});

// POST Request to Create a hard-coded user
router.post('/', (req, res) => {
  let mysql = req.app.get('mysql');
  let sql = 'INSERT INTO user (email, pw) VALUES (?, ?)';
  let inserts = [req.body.email, req.body.pw];
  sql = mysql.pool.query(sql, inserts, (err, results) => {
    if (err) {
      res.write(JSON.stringify(err));
      res.end();
    } else {
      res.redirect('/user');
    }
  });
});

// PUT request to Update user in database
router.put('/:id', function(req, res) {
  let mysql = req.app.get('mysql');
  // console.log(req.body)
  // console.log(req.params.id)
  let sql = 'UPDATE user SET email=?, pw=? WHERE id=?';
  let inserts = [req.body.email, req.body.pw, req.params.id];
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

// // Delete user from database
// router.get('/deleteuser/:id', (req, res) => {
//   let sql = `DELETE FROM user WHERE id = ${req.params.id}`;
//   let query = connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(JSON.stringify(result));
//   });
// });

module.exports = router;
