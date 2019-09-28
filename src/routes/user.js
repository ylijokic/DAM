const express = require('express')

const router = express.Router()

// Helper function to Select all users
function getUsers(res, mysql, context, complete) {
  mysql.pool.query('SELECT * FROM user', (error, results, fields) => {
    if (error) {
      res.write(JSON.stringify(error))
      res.end()
    }
    context.user = results
    complete()
  })
}

// Helper function to Select a single user
function getSingleUser(res, mysql, context, id, complete) {
  const sql = `SELECT * FROM user WHERE id = ?`
  const inserts = [id]
  mysql.pool.query(sql, inserts, (error, results, fields) => {
    if (error) {
      res.write(JSON.stringify(error))
      res.end()
    }
    context.user = results
    complete()
  })
}

// GET request to Select all users in database
router.get('/', (req, res) => {
  const context = {}
  const mysql = req.app.get('mysql')
  getUsers(res, mysql, context, complete)
  function complete() {
    res.send(context)
  }
})

// GET request to Select a single user from database
router.get('/:id', (req, res) => {
  const context = {}
  const mysql = req.app.get('mysql')
  getSingleUser(res, mysql, context, req.params.id, complete)
  function complete() {
    res.send(context)
  }
})

// POST Request to Create a hard-coded user
router.post('/', (req, res) => {
  const mysql = req.app.get('mysql')
  const sql = 'INSERT INTO user (email, pw) VALUES (?, ?)'
  const inserts = [req.body.email, req.body.pw]
  mysql.pool.query(sql, inserts, (error, results) => {
    if (error) {
      res.write(JSON.stringify(error))
      res.end()
    } else {
      res.redirect('/user')
    }
  })
})

// PUT request to Update user in database
// FIXME: this function should be updated to handle partial user updates
router.put('/:id', function(req, res) {
  const mysql = req.app.get('mysql')
  const sql = 'UPDATE user SET email=?, pw=? WHERE id=?'
  const inserts = [req.body.email, req.body.pw, req.params.id]
  mysql.pool.query(sql, inserts, (error, results) => {
    if (error) {
      res.write(JSON.stringify(error))
      res.end()
    } else {
      res.status(200)
      res.end()
    }
  })
})

// DELETE request to Delete user from database
router.delete('/:id', function(req, res) {
  const mysql = req.app.get('mysql')
  const sql = 'DELETE FROM user WHERE id=?'
  const inserts = [req.params.id]
  mysql.pool.query(sql, inserts, (error, results) => {
    if (error) {
      // console.log(error)
      res.write(JSON.stringify(error))
      res.status(400)
      res.end()
    } else {
      res.end()
    }
  })
})

module.exports = router
