// Retorna Noticias para usuários
jQuery(document).ready(function() {
    $.ajax({
        url: "/retornarnoticia",
        type: "get",
        dataType: "json",
        assync: true
    }).done(function (calback){
        criarTabela(calback.noticia)
    })
})

function criarTabela(noticia){
    for (index = 0; index < noticia.length; index++) {

        if(noticia[index].newPath == 'semimg'){
            newNotice = $("<div class='panel panel-default'>" + 
            "<div class='panel-heading icon'><i class='glyphicon glyphicon-envelope'></i></div>" +
            "<div class='panel-heading'><h3>" + noticia[index].titulo + "</h3></div>" +
            "<div class='panel-body'><textarea class='form-control' rows='8' disabled>" + noticia[index].descricao + "</textarea></div>" +
            "<br/>" + 
            "<ul class='list-group'>" +
            "<li class='list-group-item'>Data da postagem: " + noticia[index].data_publicacao + "</li>" +
            "</ul>"+
            "<br/>")
        }else{
            newNotice = $("<div class='panel panel-default'>" + 
            "<div class='panel-heading icon'><i class='glyphicon glyphicon-envelope'></i></div>" +
            "<div class='panel-heading'><h3>" + noticia[index].titulo + "</h3></div>" +
            "<div class='panel-body'><textarea class='form-control' rows='2' disabled>" + noticia[index].descricao + "</textarea></div>" +
            "<br/>" +
            "<div align='center'><img src = '" + noticia[index].newPath + "' height='500' width='500'class='img-thumbnail m-x-auto d-block '/></div>"+
            "<br/>" +
            "<ul class='list-group'>" +
            "<li class='list-group-item'>Data da postagem: " + noticia[index].data_publicacao + "</li>" +
            "</ul>"+
            "<br/>")
        }
        
        appendTable(newNotice)
    }
}

function appendTable(newNotice) {
    $("#noticias").append(newNotice)
}