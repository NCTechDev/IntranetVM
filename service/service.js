
'use strict'

const async = require('async'),
      bcrypt = require('bcryptjs'),
      connection = require('../config/connection'),
      httpStatus = require('http-status')

var service = {

    //Cadastro de usuários -- USADO SÓ PELO POSTMAN 
    registro: function (data,callback){
        let senhaCriptografada = bcrypt.hashSync(data.txtSenha, 10),
            sql = 'INSERT INTO usuarios (login, senha, nivel_acesso) VALUES (?, ?, ?)'
        
        connection.query(sql, [data.txtLogin, senhaCriptografada, data.txtNivelAcesso], function (error, result){
            if(error){
                if(error.code == 'ER_DUP_ENTRY')
                    callback(error, httpStatus.CONFLICT, 'Usuário ' + data.txtLogin + ' já está em uso.')
                else
                    callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos :( Tente novamente.')
            }else{
                callback(null, httpStatus.CREATED, 'Usuário ' + data.txtLogin + ' cadastrado com sucesso.')
            }
        })
    },

    //Login
    access: function (txtUsuario, txtSenha_Acesso, callback){
        async.waterfall([
            dbLogin,
            dbPass


        ], function (error, status, message, user) {
            if (error) callback(error, status, message)
            else callback(error, status, message, user)
        })
        function dbLogin(cb) {
            let sql = 'SELECT * FROM usuarios WHERE login = ? LIMIT 1'
            connection.query(sql, txtUsuario, function (error, result) {
                if (error){
                    cb(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
                } else {
                    if (result == null || result.length == 0) {
                        cb(new Error(), httpStatus.UNAUTHORIZED, 'Usuário não encontrado.')
                    } else {
                        cb(null, result[0])
                    }
                }
            })
        }
        function dbPass(dbResult, cb) {
            if (bcrypt.compareSync(txtSenha_Acesso, dbResult.senha)){
                //cb(null, dbResult)
                cb(null, httpStatus.OK, 'Login efetudado com sucesso.', dbResult)
            } else {
                cb(new Error(), httpStatus.UNAUTHORIZED, 'Senha inválida')
            }
        }
        
    }
}   

module.exports = service