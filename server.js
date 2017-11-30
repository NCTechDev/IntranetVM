'use strict'

const bodyParser = require('body-parser'),
      express = require('express',)
      passport = require('passport'),
      session = require('express-session'),
      app = express()

app.use(bodyParser());
app.use(express.static("public"));

const port = 80,
      hostname = "localhost"

      
app.listen(port, onStart())
require('./routes')(app, passport)

function onStart() {
    console.log(`Server started at http://${hostname}:${port}`)
}