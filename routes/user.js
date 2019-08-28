const express = require('express');
const router = express.Router();

// // Insert a hard-coded user
// router.get('/adduser', (req, res) => {
//   let user = { email: 'user2@gmail.com', pw: 'userPassword!' };
//   let sql = 'INSERT INTO user SET ?';
//   let query = connection.query(sql, user, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(result.insertId);
//   });
// });

function getUsers(res, mysql, context, complete) {
  mysql.pool.query('SELECT * FROM user', function(err, results, fields) {
    if (err) {
      res.write(JSON.stringify(err));
      res.end();
    }
    context.user = results;
    complete();
  });
}

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

//Route to Select all users in database
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

//Route to Select a single user from database
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

// // Route to Update user password in database
// router.get('/update/:id', (req, res) => {
//   let newPassword = 'Updated_Password!';
//   let sql = `UPDATE user SET pw = '${newPassword}' WHERE id = ${req.params.id}`;
//   let query = connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(JSON.stringify(result));
//   });
// });

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
