const express = require('express')
const expressHandlebars = require('express-handlebars')
const mysql = require('./dbconn')

const app = express()
const hbs = expressHandlebars.create({ defaultLayout: 'main' })

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// Router Modules
const user = require('./routes/user')
const asset = require('./routes/asset')
const folder = require('./routes/folder')
const assetFolder = require('./routes/asset_folder_mapping')

// Load Router Modules in App
app.use('/user', user)
app.use('/asset', asset)
app.use('/folder', folder)
app.use('/asset_folder', assetFolder)

// Load Database into App
app.set('mysql', mysql)

app.use((req, res) => {
  res.status(404)
  res.render('404')
})

app.use((err, req, res) => {
  res.status(500)
  res.render('500')
})

app.listen('3000', () => {
  console.log('Server started on port 3000')
})
