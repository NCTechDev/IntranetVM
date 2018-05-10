'use strict'
const path = __dirname + '/public/'
const controller = require('./controller/controller')
const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const storageDown = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/downs/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage : storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/gif' && file.mimetype !== 'image/jpeg'
            && file.mimetype !== 'image/jpg') {
            return cb(null, false, new Error('I don\'t have a clue!'));
        }
        cb(null, true);
      }
 });

const uploadDown = multer({ storage : storageDown });

module.exports = function (app, passport) {
     
    /* Rotas */
    app.use(function (req, res, next) {
        console.log('%s %s', req.method, req.url)
        next()
    })

    /* Home do Site e Noticias */
    app.get('/', function (req, res) {
        res.sendFile(path + 'index.html')
    })

    /* Página de Login */
    app.route('/login')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'login.html')
        })
        .post(function (req, res, next){
            passport.authenticate('local-login',
                function (error, user, info) {
                    if (error) return res.status(500).json({ info: 'Desculpe-nos! Tente novamente.' })
                    if (!user) return res.status(403).json({ info })
                    req.login(user, function (error) {
                        if (error) return res.status(500).json({ info: 'Desculpe-nos! Tente novamente.'})
                        return res.status(200).json({ info })
                    })
                }
            )(req, res, next)
        })
    
    /*Redirecionamento de acessos */

    app.get('/access', isLoggedIn, function(req, res) {
        if (req.session.passport.user.nivel_acesso == '1')
            res.redirect('/administrador')
        else if (req.session.passport.user.nivel_acesso == '2')
            res.redirect('/rh')
        else if (req.session.passport.user.nivel_acesso == '3' || req.session.passport.user.nivel_acesso == '4')
            res.redirect('/posvendas')
        else
            res.redirect('/logout')
    })

    /* Nivel de Acesso 1 : ADMINISTRADOR   */

    /*Home Admin*/
    app.get('/administrador', isLoggedIn, isAuthorized(['1']), function (req, res) {
        res.sendFile(path + 'usuarios/administrador/indexAdministrador.html')
    })

    /*Listagens*/

    app.get('/listarNoticias', isLoggedIn, isAuthorized(['1']), function (req, res){
        res.sendFile(path + 'usuarios/administrador/listarNoticias.html')
    })

    app.get('/listarDownloads', isLoggedIn, isAuthorized(['1']), function (req, res){
        res.sendFile(path + 'usuarios/administrador/listarDownloads.html')
    })
    /*Cadastro Noticias*/

    app.route('/cadastroNoticia')
        .get(isLoggedIn, isAuthorized(['1']), function(req, res){
            res.sendFile(path + 'usuarios/administrador/cadastrarNoticia.html')
        })
        .post(isLoggedIn, isAuthorized(['1']), upload.single('imgUpload'), function (req, res) {
            if(req.file == null){
                var newPath = "semimg"
            }else {
                var newPath = "img/uploads/" + req.file.originalname
            }
            controller.cadastrarNoticia(newPath, req, res)
        })

    /*Edção de noticias */

    app.get('/retornartablenoticia', isLoggedIn, isAuthorized(['1']), function (req, res){
        controller.retornarTableNoticia(res)
    })

    app.get('/retornarNoticiaPorId/:idnoticia', isLoggedIn, isAuthorized(['1']), function(req, res){
        let idnoticia = req.params.idnoticia;
        controller.retornarNoticiaPorID(idnoticia, res)
    })

    app.post('/editarNoticia', isLoggedIn, isAuthorized(['1']), upload.single('imgUpload'), function(req, res){
        if(req.file == null){
            var newPath = req.body.txtPathOld
        } else{
            if(req.body.txtPathOld != 'semimg'){
                var pathImg = 'public/' + req.body.txtPathOld
                fs.unlink(pathImg)
            }
            var newPath = "img/uploads/" + req.file.originalname  
        }
        controller.editarNoticia(newPath, req, res)
    })

    /*Exclusão de noticias */
    app.post('/excluirNoticia', isLoggedIn, isAuthorized(['1']), function (req,res){
        if(req.body.newPath != 'semimg'){
            var pathImg = 'public/' + req.body.newPath
            fs.unlink(pathImg)
        }
        controller.excluirNoticia(req,res)
    })

    /* Cadastro de downloads */

    app.route('/cadastroDownload')
        .get(isLoggedIn, isAuthorized(['1']), function(req, res){
            res.sendFile(path + 'usuarios/administrador/cadastrarDownload.html')
        }).post(isLoggedIn, isAuthorized(['1']), uploadDown.single('arqUpload'), function (req, res) {
            var newPath = "downs/uploads/" + req.file.originalname
            controller.cadastrarDownload(newPath, req, res)
        })
    
    /* Exclusão de downloads */

    app.post('/excluirDownload', isLoggedIn, isAuthorized(['1']), function (req,res){
        var pathDown = 'public/' + req.body.newPath
        fs.unlink(pathDown)
        controller.excluirDownload(req,res)
    })
    
    /* Nivel de Acesso 2 : RH   */

    /*Home RH*/
    app.get('/rh', isLoggedIn, isAuthorized(['1','2']), function (req, res) {
        res.sendFile(path + 'usuarios/rh/indexRh.html')
    })

    /* Listagens */

    app.get('/listarVagas', isLoggedIn, isAuthorized(['1','2']), function (req, res){
        res.sendFile(path + 'usuarios/rh/listarVagas.html')
    })

    /*Cadastro Vagas*/

    app.post('/cadastrarVaga', isLoggedIn, isAuthorized(['1','2']), function (req, res){
        controller.cadastrarVaga(req, res)
    })

    /*Edição de vagas */

    app.get('/retornartablevaga', isLoggedIn, isAuthorized(['1','2']), function (req, res){
        controller.retornarTableVaga(res)
    })

    app.get('/retornarVagaPorId/:idvaga', isLoggedIn, isAuthorized(['1','2']), function(req, res){
        let idvaga = req.params.idvaga;
        controller.retornarVagaPorID(idvaga, res)
    })

    app.post('/editarVaga', isLoggedIn, isAuthorized(['1','2']), function(req, res){
        controller.editarVaga(req, res)
    })

    app.post('/mudarEstado/:idvaga', isLoggedIn, isAuthorized(['1','2']), function(req, res){
        let idvaga = req.params.idvaga;
        controller.mudarEstado(idvaga, req, res)
    })

     /* Nivel de Acesso 3 e 4 : POS VENDAS   */
     /* 3 Acesso restrito */
     /* 4 Acesso full */

    app.get('/posvendas', isLoggedIn, isAuthorized(['1','3','4']), function (req, res) {
        res.sendFile(path + 'usuarios/posvendas/cadastrarVisita.html')
    })

    app.post('/cadastrarVisita', isLoggedIn, isAuthorized(['1','3','4']), function (req, res){
        controller.cadastrarVisita(req, res)
    })

    app.get('/relatoriosVisitas', isLoggedIn, isAuthorized(['1','3','4']), function (req, res) {
        res.sendFile(path + 'usuarios/posvendas/relatoriosVisita.html')
    })

    app.get('/retornarVisita', isLoggedIn, isAuthorized(['1','3','4']), function(req, res){
        controller.retornarVisita(req.query, res)
    })

    app.get('/retornarTodasVisitas', isLoggedIn, isAuthorized(['1','4']), function(req, res){
        controller.retornarTodasVisitas(req.query, res)
    })

    app.get('/retornarVisitaPorId/:idvisita', isLoggedIn, isAuthorized(['1','3','4']), function(req, res){
        let idvisita = req.params.idvisita;
        controller.retornarVisitaPorID(idvisita, res)
    })

    /*Páginas*/
    /* Página de Downloads */
    app.route('/downloadsPag')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'downloadsPag.html')
        })
    
    /* Página de Vagas*/
    app.route('/vagas')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'vagas.html')
        })

    /* Página de Chamados */
    app.route('/chamados')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'chamadosPag.html')
        })
    /*Retorno de Noticias, vagas e downloads*/
    app.get('/retornarnoticia', function (req, res) {
        controller.retornarNoticias(res)
    })

    app.get('/retornarvaga', function (req, res) {
        controller.retornarVagas(res)
    })

    app.get('/retornardownload', function (req, res) {
        controller.retornarDownload(res)
    })


    
    /* Páginas de manuais */
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
    
    /* Fim das páginas de manuais */

    /* Rota de Cadastro de Usuários - USADO VIA POSTMAN*/
    app.route('/register')
        .post(function (req, res) {
            controller.registro(req, res)
        })
    
    /*Logout */
    app.get('/logout', function (req, res) {
        req.session.destroy(function (error) {
            if (error) { return next(error) }
            res.clearCookie('intranetvm')
            req.logout()
            res.redirect('/login')
        })
    })

    /*Retornar users*/
    app.get('/retornarUsuarios', function (req, res){
        controller.retornarUsuarios(res)
    })
        
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()
    else
        res.redirect('/logout')
}

function isAuthorized(access) {
    return function (req, res, next) {
        if (access.indexOf(req.session.passport.user.nivel_acesso) != -1)
            return next()
        else
            res.redirect('/logout')
    }
}