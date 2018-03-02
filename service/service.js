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
                cb(null, httpStatus.OK, 'Login efetudado com sucesso.', dbResult)
            } else {
                cb(new Error(), httpStatus.UNAUTHORIZED, 'Senha inválida')
            }
        }
        
    },

    /*Operações de noticia*/
    cadastrarNoticia: function (newPath, data, callback){
        let dataAtual = new Date(),
            sql = 'INSERT INTO noticia (data_publicacao, titulo, descricao, ' +
                   'inicio, termino, newPath) VALUES (?, ?, ?, ?, ?, ?)'
        // Query no Banco de Dados
        connection.query(sql,
            [dataAtual, data.txtTitulo, data.txtDescricao, data.txtData_Inicio, data.txtData_Fim, newPath],
            function(error, result){
                if (error){
                    callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
                } else {
                    callback(null, httpStatus.OK, 'Cadastrado com sucesso!')
                }
            })
    },

    retornarNoticias: function(callback){
        let sql = 'SELECT DATE_FORMAT(data_publicacao, "%d/%m/%Y") AS data_publicacao, ' +
            'titulo, descricao, newPath FROM noticia WHERE inicio <= NOW() AND termino >= NOW() '+
            'ORDER BY idnoticia DESC'
        //Query no banco de Dados
        connection.query(sql, function (error, result) {
            if(error) {
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
            } else {
                callback(null, result)
            }
        })
    },

    retornarTableNoticia: function(callback){
        let sql = 'SELECT DATE_FORMAT(data_publicacao, "%d/%m/%Y") AS data_publicacao, ' +
            'idnoticia, titulo, descricao, DATE_FORMAT(inicio, "%d/%m/%Y") AS inicio, newPath, ' +
             'DATE_FORMAT(termino, "%d/%m/%Y") AS termino FROM noticia ORDER BY idnoticia DESC'
        //*Query no banco de Dados
        connection.query(sql, function(error, result){
            if(error){
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente Novamente.')
            } else {
                callback(null, result)
            }
        })
    },

    retornarNoticiaPorID: function(idnoticia, callback){
        let sql = 'SELECT DATE_FORMAT(data_publicacao, "%Y-%m-%d") AS data_publicacao, ' +
            'idnoticia, titulo, descricao, DATE_FORMAT(inicio, "%Y-%m-%d") AS inicio,' +
            'DATE_FORMAT(termino, "%Y-%m-%d") AS termino, newPath FROM noticia WHERE idnoticia = ?'
        //Query no banco de dados
        connection.query(sql,[idnoticia], function(error, result){
            if(error){
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente Novamente.')
            }else{
                callback(null, result)
            }
        })
    },

    editarNoticia: function(newPath, data, callback){
        let sql = 'UPDATE noticia SET ' + 
                'data_publicacao=?, titulo=?, descricao=?, inicio=?, termino=?, newPath=?' + 
                'WHERE idnoticia=?'
        //Query no banco de dados
        connection.query(sql, 
            [data.txtData_Publicacao, data.txtTitulo, data.txtDescricao,data.txtData_Inicio, data.txtData_Fim, newPath, data.txtIdNoticia],
            function(error, result){
                if (error) {
                    callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
                } else {
                    callback(null, httpStatus.OK, 'Notícia atualizada com sucesso!')
                }
            })
    },

    excluirNoticia: function (data, callback){
        let sql = 'DELETE FROM noticia WHERE idnoticia = ?'
        //Query no banco de dados
        connection.query(sql,[data.idnoticia], function(error, result){
            if(error){
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
            }else{
                callback(null, httpStatus.OK, 'Notícia excluída com sucesso!')
            }
        })
    },

    /*Operações Download */

    cadastrarDownload: function (newPath, data, callback){
        let sql = 'INSERT INTO download (titulo, newPath) VALUES (?, ?)'
        // Query no Banco de Dados
        connection.query(sql,
            [data.txtTitulo, newPath],
            function(error, result){
                if (error){
                    callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
                } else {
                    callback(null, httpStatus.OK, 'Cadastrado com sucesso!')
                }
            })
    },

    retornarDownload: function(callback){
        let sql = 'SELECT iddownload, titulo, newPath FROM download ORDER BY iddownload' 
        //Query no banco de Dados
        connection.query(sql, function (error, result) {
            if(error) {
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
            } else {
                callback(null, result)
            }
        })
    },

    excluirDownload: function (data, callback){
        let sql = 'DELETE FROM download WHERE iddownload =?'
        //Query no banco de dados
        connection.query(sql,[data.iddownload], function(error, result){
            if(error){
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
            }else{
                callback(null, httpStatus.OK, 'Download excluído com sucesso!')
            }
        })
    },

    /*Operações de Vagas*/
    cadastrarVaga: function (data, callback){
        let dataAtual = new Date(),
            estado = 'aberto',
            sql = 'INSERT INTO vaga (data_publicacao, titulo, descricao, ' +
                    'estado) VALUES (?, ?, ?, ?)'
        connection.query(sql,
            [dataAtual, data.txtTitulo, data.txtDescricao, estado],
            function(error, result){
                if (error){
                    callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
                } else {
                    callback(null, httpStatus.OK, 'Vaga cadastrada com sucesso!')
                }
            })
    },

    retornarVagas: function(callback){
        let sql = 'SELECT titulo, descricao FROM vaga WHERE estado = "aberto" ORDER BY idvaga DESC' 
        //Query no banco de Dados
        connection.query(sql, function (error, result) {
            if(error) {
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
            } else {
                callback(null, result)
            }
        })
    },

    retornarTableVaga: function(callback){
        let sql = 'SELECT DATE_FORMAT(data_publicacao, "%d/%m/%Y") AS data_publicacao, ' +
            'idvaga, titulo, descricao, estado ' +
            'FROM vaga ORDER BY idvaga DESC'
        //*Query no banco de Dados
        connection.query(sql, function(error, result){
            if(error){
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente Novamente.')
            } else {
                callback(null, result)
            }
        })
    },

    retornarVagaPorID: function(idvaga, callback){
        let sql = 'SELECT DATE_FORMAT(data_publicacao, "%Y-%m-%d") AS data_publicacao, ' +
            'titulo, descricao' +
            ' FROM vaga WHERE idvaga = ?'
        //Query no banco de dados
        connection.query(sql,[idvaga], function(error, result){
            if(error){
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente Novamente.')
            }else{
                callback(null, result)
            }
        })
    },

    editarVaga: function( data, callback){
        let sql = 'UPDATE vaga SET ' + 
                'titulo=?, descricao=?' + 
                'WHERE idvaga=?'
        //Query no banco de dados
        connection.query(sql, 
            [data.txtTitulo, data.txtDescricao, data.txtIdVaga],
            function(error, result){
                if (error) {
                    callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
                } else {
                    callback(null, httpStatus.OK, 'Vaga atualizada com sucesso!')
                }
            })
    },

    mudarEstado: function(idvaga, data, callback){
        let sql = 'UPDATE vaga SET ' +
                'estado=? ' +
                'WHERE idvaga=?'
        //Query no banco de dados
        connection.query(sql, 
            [data.newEstado, idvaga],
            function(error, result){
                if (error) {
                    callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
                } else {
                    callback(null, httpStatus.OK, 'Estado atualizado com sucesso!')
                }
            })
    },

    /*Operações com Visitas*/

    cadastrarVisita: function (data, callback){
        let dataCadastro = new Date(),
            sql = 'INSERT INTO visita (data_visita, data_cadastro, nomeDeFantasia, ' +
                    'razao_social, cnpj, cidade, celular, celular2, fixo, email, observacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        connection.query(sql,
            [data.txtData_Visita, dataCadastro, data.txtNomeFantasia, data.txtRazaoSocial, data.txtCnpj, data.selectCidade,
             data.txtCelular, data.txtCelular2, data.txtFixo, data.txtEmail, data.txtObservacao],
            function(error, result){
                if (error){
                    callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos! Tente novamente.')
                } else {
                    callback(null, httpStatus.OK, 'Visita cadastrada com sucesso!')
                }
            })
    },

}   

module.exports = service