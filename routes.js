'use strict'

const path = __dirname + '/public/'

module.exports = function (app) {
     
    /* Rotas */
    app.use(function (req, res, next) {
        console.log('%s %s', req.method, req.url)
        next()
    })

    /* Home do Site */
    app.get('/', function (req, res) {
        res.sendFile(path + 'index.html')
    })

    app.route('/login')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'login.html')
        })

}