//Form submit
jQuery(document).ready(function (){
    $('.form-users').submit(function (event){
        event.preventDefault()
        validacaoRegistro()
    })
})

//Validações
function validacaoRegistro(){
    //Mensagens de erros
    msgErrors = ""
    
    // Campos vazios
    if ($('#txtTitulo').val() == "" ||
        $('#arqUpload').val() == "" 
    ){
        msgErrors = "Todos Campos são obrigatórios!"
    }

    if (msgErrors) {
        enviarMsg(msgErrors)
    } else {
        enviarMsg(msgErrors)
        $('#divResult').removeClass("alert-danger")
        enviarDados()
    }
    
}

function enviarMsg(msg) {
    $('#divResult').addClass("alert-danger")
    $('#result').html(msg)
    $('#divResult').fadeIn(500)
    return false
}

function enviarDados(){

    var formData = new FormData($('form')[0])

    $.ajax({
        url: "/cadastroDownload",
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

