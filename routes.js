'use strict'
const path = __dirname + '/public/'
const controller = require('./controller/controller')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

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
            var newPath = "img/uploads/" + req.file.originalname
        }
        controller.editarNoticia(newPath, req, res)
    })

    /*Exclusão de noticias */
    app.post('/excluirNoticia', isLoggedIn, isAuthorized(['1']), function (req,res){
        controller.excluirNoticia(req,res)
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

    /*Páginas*/
    /* Página de Downloads */
    app.route('/downloads')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'downloads.html')
        })
    
    /* Página de Vagas*/
    app.route('/vagas')
        .get(function (req,res
        ){ 
            res.sendFile(path + 'vagas.html')
        })
    
    /*Retorno de Noticias e vagas*/
    app.get('/retornarnoticia', function (req, res) {
        controller.retornarNoticias(res)
    })

    app.get('/retornarvaga', function (req, res) {
        controller.retornarVagas(res)
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