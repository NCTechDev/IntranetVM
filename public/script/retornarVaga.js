// Retorna vaga para usuários
jQuery(document).ready(function() {
    $.ajax({
        url: "/retornarvaga",
        type: "get",
        dataType: "json",
        assync: true
    }).done(function (calback){
        criarTabela(calback.vaga)
    })
})

function criarTabela(vaga){
    for (i = 0; i < vaga.length; i++) {
        
        newVaga = $("<div class='panel panel-default'>" + 
        "<div class='panel-heading icon'><i class='glyphicon glyphicon-envelope'></i></div>" +
        "<div class='panel-heading'><h3>" + vaga[i].titulo + "</h3></div>" +
        "<div class='panel-body'><textarea class='form-control' rows='10' disabled>" + vaga[i].descricao + "</textarea></div>" +
        "<ul class='list-group'>" +
        "<li class='list-group-item'>Unidade: " + vaga[i].unidade + "</li>" +
        "</ul>"+
        "<br/>")

        appendTable(newVaga)
        
    } 
}

function appendTable(newVaga) {
    $("#vagas").append(newVaga)
}