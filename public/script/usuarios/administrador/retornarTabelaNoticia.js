// Retorna table notícia
jQuery(document).ready(function () {
    $.ajax({
        url: "/retornartablenoticia",
        type: "get",
        dataType: "json",
        async: true,
    }).done(function (callback) {
        criarTable(callback.noticia)
    })
})

function criarTable(noticia) {
    // Limpa table
    $("#tbodyNoticias tr").remove()
    if (noticia.length) {
        for (index = 0; index < noticia.length; index++) {
            var idnoticia = { id: noticia[index].idnoticia }
            newTrItem = $("<tr>" +
                "<td>" + noticia[index].data_publicacao + "</td>" +
                "<td>" + noticia[index].inicio + "</td>" +
                "<td>" + noticia[index].termino + "</td>" +
                "<td>" + noticia[index].titulo + "</td>" +
                "<td>" + noticia[index].descricao + "</td>" +
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modal-noticias' role='button' onclick='setarValores(" + JSON.stringify(noticia[index].idnoticia) + ");'>Editar</button></td>" +
                "<td><button type='button' class='btn btn-danger' onclick='excluirNoticia(" + JSON.stringify(idnoticia) + "); return false;'>Excluir</button></td>" +
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
