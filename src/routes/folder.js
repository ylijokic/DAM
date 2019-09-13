const express = require('express')

const router = express.Router()

// Helper function to Select all folders
function getFolders(res, mysql, context, complete) {
  mysql.pool.query('SELECT * FROM folder', (error, results) => {
    if (error) {
      res.write(JSON.stringify(error))
      res.end()
    }
    context.folder = results
    complete()
  })
}

// Helper function to Select a single folder
function getSingleFolder(res, mysql, context, id, complete) {
  const sql = `SELECT * FROM folder WHERE id = ?`
  const inserts = [id]
  mysql.pool.query(sql, inserts, (error, results) => {
    if (error) {
      res.write(JSON.stringify(error))
      res.end()
    }
    context.folder = results
    complete()
  })
}

// GET request to Select all folders in database
router.get('/', (req, res) => {
  const context = {}
  const mysql = req.app.get('mysql')
  getFolders(res, mysql, context, complete)
  function complete() {
    res.render('folder', context)
  }
})

// GET request to Select a single folder from database
router.get('/:id', (req, res) => {
  const context = {}
  const mysql = req.app.get('mysql')
  getSingleFolder(res, mysql, context, req.params.id, complete)
  function complete() {
    res.send(context)
  }
})

// POST request to insert a folder
router.post('/', (req, res) => {
  const mysql = req.app.get('mysql')
  const sql = 'INSERT INTO folder (name, creator) VALUES (?, ?)'
  const inserts = [req.body.name, req.body.creator]
  mysql.pool.query(sql, inserts, error => {
    if (error) {
      res.write(JSON.stringify(error))
      res.end()
    } else {
      res.redirect('/folder')
    }
  })
})

// PUT request to Update folder in database
router.put('/:id', (req, res) => {
  const mysql = req.app.get('mysql')
  const sql = 'UPDATE folder SET name=?, creator=? WHERE id=?'
  const inserts = [req.body.name, req.body.creator, req.params.id]
  mysql.pool.query(sql, inserts, error => {
    if (error) {
      res.write(JSON.stringify(error))
      res.end()
    } else {
      res.status(200)
      res.end()
    }
  })
})

// DELETE request to Delete a folder from database
router.delete('/:id', (req, res) => {
  const mysql = req.app.get('mysql')
  const sql = 'DELETE FROM folder WHERE id=?'
  const inserts = [req.params.id]
  mysql.pool.query(sql, inserts, error => {
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
