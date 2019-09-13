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

router.get('/', (req, res) => {
  const context = {}
  // context.jsscripts = ['filterAsset_Folder.js']
  const mysql = req.app.get('mysql')

  getAssets(res, mysql, context, complete)
  getFolders(res, mysql, context)
  function complete() {
    res.send(context)
  }
})

module.exports = router
