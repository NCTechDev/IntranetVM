'use strict'

const bodyParser = require('body-parser'),
      express = require('express'),
      passport = require('passport'),
      session = require('express-session'),
      keySecret = require('./config/secret'),
      multer = require('multer'),
      app = express()

app.use(bodyParser.urlencoded({
      extended: true
}))
app.use(bodyParser.json())
app.use(express.static("public"));
app.use(session({
      name: 'intranetvm',
      secret: keySecret,
      cookie: {
            maxAge: 3600000
      },
      resave: false,
      saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

const port = 80,
      hostname = "localhost"
app.listen(port, onStart())

require('./passport/passport')(passport)
require('./routes')(app, passport)

function onStart() {
    console.log(`Server started at http://${hostname}:${port}`)
}