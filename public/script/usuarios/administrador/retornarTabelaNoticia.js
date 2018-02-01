// Retorna table notícia
jQuery(document).ready(function () {
    $.ajax({
        url: "/retornartablenoticia",
        type: "get",
        dataType: "json",
        assync: true,
    }).done(function (callback) {
        criarTable(callback.noticia)
    })
})

function criarTable(noticia) {
    // Limpa table
    $("#tbodyNoticias tr").remove()
    if (noticia.length) {
        for (index = 0; index < noticia.length; index++) {
            var idnoticia = noticia[index].idnoticia
            var newPath = noticia[index].newPath
            newTrItem = $("<tr>" +
                "<td>" + noticia[index].data_publicacao + "</td>" +
                "<td>" + noticia[index].inicio + "</td>" +
                "<td>" + noticia[index].termino + "</td>" +
                "<td>" + noticia[index].titulo + "</td>" +
                "<td>" + noticia[index].descricao + "</td>" +
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modal-noticias' role='button' onclick='setarValores(" + JSON.stringify(noticia[index].idnoticia) + ");'>Editar</button></td>" +
                "<td><button type='button' class='btn btn-danger' onclick='excluirNoticia(" + JSON.stringify(idnoticia) + ", " + JSON.stringify(newPath) +"); return false;'>Excluir</button></td>" +
                "</tr>")
            appendTable(newTrItem)
        }
    } else {
        newTrItem = $("<tr class='danger'><td colspan='6'>Nenhum resultado encontrado.</td></tr>")
        appendTable(newTrItem)
    }
}

function appendTable(newTrItem) {
    $("#tbodyNoticias").append(newTrItem)
}
