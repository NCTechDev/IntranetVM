//Form submit
jQuery(document).ready(function (){
    $('.form-users').submit(function (event){
        event.preventDefault()
        validacaoEdicao()
    })
})

function validacaoEdicao(){
    //Mensagens de erros
    msgErrors = ""
    var dataAtual = new Date
    var data = dataAtual.getFullYear() + "-" + dataAtual.getMonth() + 1 + "-" + dataAtual.getUTCDate()  

    // Campos vazios
    if ($('#txtTitulo').val() == "" ||
        $('#txtDescricao').val() == "" ||
        $('#txtData_Inicio').val() == '' ||
        $('#txtData_Fim').val() == '' ){
        msgErrors = "Todos Campos são obrigatórios, exceto imagens!"
    }else if ( data >= $('#txtData_Fim').val() ){
        msgErrors = "Data de término deve ser superior a data atual!"
    }else if ( $('#txtData_Inicio').val() > $('#txtData_Fim').val() ){
        msgErrors = "Data de término deve ser superior a data atual!"
    }else if($('#txtData_Inicio').val() == $('#txtData_Fim').val() ){
        msgErrors = "Data de término deve ser diferente da data inicio!"
    }

    if (msgErrors) {
        enviarMsg(msgErrors)
    } else {
        enviarMsg(msgErrors)
        $('#divResult').removeClass("alert-danger")
        enviarDados()
    }
}

function enviarMsg(msg){
    $('#divResult').addClass("alert-danger")
    $('#result').html(msg)
    $('#divResult').fadeIn(500)
    return false
}

function setarValores(idnoticia){
    $.ajax({
        url: "/retornarNoticiaPorId/" + idnoticia,
        type: "get",
        dataType: "json",
        async: true,
    }).done(function (callback) {
        $("#txtIdNoticia").val(idnoticia)
        $("#txtTitulo").val(callback.noticia[0].titulo)
        $("#txtData_Inicio").val(callback.noticia[0].inicio)
        $("#txtData_Fim").val(callback.noticia[0].termino);
        $("#txtDescricao").val(callback.noticia[0].descricao)
        $("#txtPathOld").val(callback.noticia[0].newPath)
    })
}

function enviarDados(){
    var formData = new FormData($('form')[0])
    
    $.ajax({
        url: "/editarNoticia",
        type: "post",
        data: formData,
        assync: false,
        cache: false,
        contentType: false,
        processData: false,
        complete: function () {
            setTimeout(function () {
                $('#btn-loading').button('reset')
            }, 1500)
        }
    }).done(function (callback) {
        bootbox.alert({
            message: callback.message,
            callback: function(){
                location.reload()
            }
        })
    }).fail(function (callback) {
        jsonCb = JSON.parse(callback.responseText)
        enviarMsg(jsonCb.message)
    })

}
