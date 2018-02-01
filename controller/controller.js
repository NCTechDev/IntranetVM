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
    },

    retornarTableNoticia: function(res){
        service.retornarTableNoticia(function(error, noticia){
            res.status(httpStatus.OK).json({ noticia: noticia })
        })
    },

    retornarNoticiaPorID: function(idnoticia, res){
        service.retornarNoticiaPorID(idnoticia, function(error, noticia){
            res.status(httpStatus.OK).json({ noticia : noticia})
        })
    },

    editarNoticia: function(newPath, req, res){
        service.editarNoticia(newPath, req.body, function(error, status, message){
            res.status(status).json({ message : message})
        })
    },

    excluirNoticia: function(req, res){
        service.excluirNoticia(req.body, function(error, status, message){
            res.status(status).json({ message: message})
        })
    },

    // Downloads

    cadastrarDownload: function (newPath ,req, res){
        service.cadastrarDownload(newPath, req.body, function(error, status, message){
            res.status(status).json({ message : message})
        })
    },

    retornarDownload: function(res){
        service.retornarDownload(function(error, download){
            res.status(httpStatus.OK).json({ download:download})
        })
    },

    excluirDownload: function(req, res){
        service.excluirDownload(req.body, function(error, status, message){
            res.status(status).json({ message: message})
        })
    },

    //Vagas

    cadastrarVaga: function (req, res){
        service.cadastrarVaga(req.body, function(error, status, message){
            res.status(status).json({message : message})
        })
    },

    retornarVagas: function(res){
        service.retornarVagas(function(error, vaga){
            res.status(httpStatus.OK).json({ vaga:vaga})
        })
    },

    retornarTableVaga: function(res){
        service.retornarTableVaga(function(error, vaga){
            res.status(httpStatus.OK).json({ vaga: vaga })
        })
    },

    retornarVagaPorID: function(idvaga, res){
        service.retornarVagaPorID(idvaga, function(error, vaga){
            res.status(httpStatus.OK).json({ vaga : vaga})
        })
    },

    editarVaga: function(req, res){
        service.editarVaga(req.body, function(error, status, message){
            res.status(status).json({ message : message})
        })
    },

    mudarEstado: function(idvaga, req, res){
        service.mudarEstado(idvaga, req.body, function(error, status, message){
            res.status(status).json({ message : message})
        })
    }

}

module.exports = controller