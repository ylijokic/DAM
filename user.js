module.exports = () => {
  const express = require('express');
  const router = express.Router();

  // Insert a hard-coded user
  router.get('/adduser', (req, res) => {
    let user = { email: 'user2@gmail.com', pw: 'userPassword!' };
    let sql = 'INSERT INTO user SET ?';
    let query = connection.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result.insertId);
    });
  });

  //Route to Select all users in database
  router.get('/', (req, res) => {
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
  router.get('/getuser/:id', (req, res) => {
    let sql = `SELECT * FROM user WHERE id = ${req.params.id} `;
    let query = connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.send(JSON.stringify(result));
    });
  });

  // Route to Update user password in database
  router.get('/updateuser/:id', (req, res) => {
    let newPassword = 'Updated_Password!';
    let sql = `UPDATE user SET pw = '${newPassword}' WHERE id = ${req.params.id}`;
    let query = connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    });
  });

  // Delete user from database
  router.get('/deleteuser/:id', (req, res) => {
    let sql = `DELETE FROM user WHERE id = ${req.params.id}`;
    let query = connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    });
  });

  return router;
};
