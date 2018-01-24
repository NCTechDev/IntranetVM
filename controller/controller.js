'use strict'

const service = require('../service/service'),
      httpStatus = require('http-status')

var controller = {

    //Registro de novo usuário
    registro: function(req,res){
        service.registro(req.body, function (error, status, message){
            res.status(status).json({ message: message})
        })
    },

    login: function (txtUsuario, txtSenha_Acesso, callback) {
        service.access(txtUsuario, txtSenha_Acesso, function(error, status, message, user) {
            if (status == httpStatus.OK) callback(null, user)
            else if (status == httpStatus.UNAUTHORIZED) callback(null, false, message)
            else callback(error)
        })
    },

    //Noticias
    cadastrarNoticia: function (newPath ,req, res){
        service.cadastrarNoticia(newPath, req.body, function(error, status, message){
            res.status(status).json({ message : message})
        })
    },

    retornarNoticias: function(res){
        service.retornarNoticias(function(error, noticia){
            res.status(httpStatus.OK).json({ noticia:noticia})
        })
    }

}

module.exports = controller