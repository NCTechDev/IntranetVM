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

    app.route('/downloads')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'downloads.html')
        })

    app.route('/manuaisvendas')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'manuaisvendas.html')
        })
    
    app.route('/manuaispv')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'manuaispv.html')
        })
    
    app.route('/manuaisadm')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'manuaisadm.html')
        })
    
    app.route('/manuaisest')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'manuaisest.html')
        })
    
    app.route('/manuaiscomp')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'manuaiscomp.html')
        })
    
    app.route('/manuaisfei')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'manuaisfei.html')
        })
    
    app.route('/manuaistrein')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'manuaistrein.html')
        })
    app.route('/vagas')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'vagas.html')
        })
        
}