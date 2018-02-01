// Retorna vaga para usuários
jQuery(document).ready(function() {
    $.ajax({
        url: "/retornardownload",
        type: "get",
        dataType: "json",
        assync: true
    }).done(function (calback){
        criarTabela(calback.download)
    })
})

function criarTabela(download) {
    // Limpa table
    $("#tbodyDownloads tr").remove()
    if (download.length) {
        for (index = 0; index < download.length; index++) {
            var iddownload = download[index].iddownload
            var newPath = download[index].newPath
            newTrItem = $("<tr>" +
                "<td>" + download[index].titulo + "</td>" +
                "<td><a href='" + newPath + "' download='" + newPath + "'>Baixar Arquivo</a></td>" +
                "<td><button type='button' class='btn btn-danger' onclick='excluirDownload(" + JSON.stringify(iddownload) + ", " + JSON.stringify(newPath) +"); return false;'>Excluir</button></td>" +
                "</tr>")
            appendTable(newTrItem)
        }
    } else {
        newTrItem = $("<tr class='danger'><td colspan='6'>Nenhum resultado encontrado.</td></tr>")
        appendTable(newTrItem)
    }
}

function appendTable(newTrItem) {
    $("#tbodyDownloads").append(newTrItem)
}

function excluirDownload(iddownload, newPath){
    var dados = {iddownload : iddownload, newPath: newPath}
    
        $.ajax({
            url: "/excluirDownload",
            type: "post",
            dataType: "json",
            assync: true,
            data: dados
        }).done(function (callback){
            bootbox.alert({
                message: callback.message,
                callback: function(){
                    location.reload()
                }
            })
        }).fail(function (callback) {
            jsonCB = JSON.parse(callback.responseText)
            bootbox.alert({
                message: jsonCB.message
            })
        })
}