// Retorna table notícia
jQuery(document).ready(function () {
    $.ajax({
        url: "/retornartablevaga",
        type: "get",
        dataType: "json",
        async: true,
    }).done(function (callback) {
        criarTable(callback.vaga)
        console.log(callback)
    })
})

function criarTable(vaga) {
    // Limpa table.

    $("#tbodyVagas tr").remove()
    if (vaga.length) {
        for (index = 0; index < vaga.length; index++) {
            
            
            var idvaga = vaga[index].idvaga
            var estado = vaga[index].estado

            if(estado == 'aberto') {

            newTrItem = $("<tr>" +
                "<td>" + vaga[index].data_publicacao + "</td>" +
                "<td>" + vaga[index].titulo + "</td>" +
                "<td>" + vaga[index].descricao + "</td>" +
                "<td>" + vaga[index].unidade + "</td>"+
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modal-vagas' role='button' onclick='setarValores(" + JSON.stringify(idvaga) + ");'>Editar</button></td>" +
                "<td><button type='button' class='btn btn-danger' onclick='mudarEstado(" + JSON.stringify(idvaga) + "," + JSON.stringify(estado) + ");' return false;'>Desabilitar</button></td>" +
                "</tr>")
            appendTable(newTrItem)

            } else {



                newTrItem = $("<tr>" +
                    "<td>" + vaga[index].data_publicacao + "</td>" +
                    "<td>" + vaga[index].titulo + "</td>" +
                    "<td>" + vaga[index].descricao + "</td>" +
                    "<td>" + vaga[index].unidade + "</td>"+
                    "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modal-vagas' role='button' onclick='setarValores(" + JSON.stringify(idvaga) + ");'>Editar</button></td>" +
                    "<td><button type='button' class='btn btn-success' onclick='mudarEstado(" + JSON.stringify(idvaga) + "," + JSON.stringify(estado) + ");' return false;'>Habilitar</button></td>" +
                    "</tr>")
                appendTable(newTrItem)
            }
        }
    } else {
        newTrItem = $("<tr class='danger'><td colspan='6'>Nenhum resultado encontrado.</td></tr>")
        appendTable(newTrItem)
    }
}

function appendTable(newTrItem) {
    $("#tbodyVagas").append(newTrItem)
}
