const express = require('express')

const router = express.Router()

// Helper function to Select all assets
function getAssets(res, mysql, context, complete) {
  mysql.pool.query('SELECT * FROM asset', (error, results) => {
    if (error) {
      res.write(JSON.stringify(error))
      res.end()
    }
    context.asset = results
    complete()
  })
}

// Helper function to Select a single asset
function getSingleAsset(res, mysql, context, id, complete) {
  const sql = `SELECT * FROM asset WHERE id = ?`
  const inserts = [id]
  mysql.pool.query(sql, inserts, (error, results) => {
    if (error) {
      res.write(JSON.stringify(error))
      res.end()
    }
    context.asset = results
    complete()
  })
}

// GET request to Select all assets in database
router.get('/', (req, res) => {
  const context = {}
  const mysql = req.app.get('mysql')
  getAssets(res, mysql, context, complete)
  function complete() {
    res.render('asset', context)
  }
})

// GET request to Select a single asset from database
router.get('/:id', (req, res) => {
  const context = {}
  const mysql = req.app.get('mysql')
  getSingleAsset(res, mysql, context, req.params.id, complete)
  function complete() {
    res.send(context)
  }
})

// POST request to Create an asset
router.post('/', (req, res) => {
  const mysql = req.app.get('mysql')
  const sql =
    'INSERT INTO asset (name, physical_file_name, uploader, physical_file_size, physical_file_type) VALUES (?, ?, ?, ?, ?)'
  const inserts = [
    req.body.name,
    req.body.fileName,
    req.body.uploader,
    req.body.fileSize,
    req.body.fileType,
  ]
  mysql.pool.query(sql, inserts, error => {
    if (error) {
      res.write(JSON.stringify(error))
      res.end()
    } else {
      res.redirect('/asset')
    }
  })
})

// PUT request to Update asset in database
router.put('/:id', (req, res) => {
  const mysql = req.app.get('mysql')
  const sql =
    'UPDATE asset SET name=?, physical_file_name=?, uploader=?, physical_file_size=?, physical_file_type=? WHERE id=?'
  const inserts = [
    req.body.name,
    req.body.fileName,
    req.body.uploader,
    req.body.fileSize,
    req.body.fileType,
    req.params.id,
  ]
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

// DELETE request to Delete an asset from database
router.delete('/:id', (req, res) => {
  const mysql = req.app.get('mysql')
  const sql = 'DELETE FROM asset WHERE id=?'
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
