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
        $('#txtDescricao').val() == "" ||
        $('#selectUnidade').val() == "Selecione"
    ){
        msgErrors = "Todos Campos são obrigatórios"
    }

    if (msgErrors) {
        enviarMsg(msgErrors)
    } else {
        enviarMsg(msgErrors)
        $('#divResult').removeClass("alert-danger")
        enviarDados()
    }
    
}

//Envio msg de erro
function enviarMsg(msg) {
    $('#divResult').addClass("alert-danger")
    $('#result').html(msg)
    $('#divResult').fadeIn(500)
    return false
}

// Envia forms via AJAX
function enviarDados(){
    $.ajax({
        url: "/cadastrarVaga",
        type: "post",
        dataType: "json",
        async: true,
        data: $("form").serialize(),
        complete: function () {
            setTimeout(function () {
                $('#btn-loading').button('reset')
            }, 1500)
        }
    }).done(function(callback){
        bootbox.alert({
            message: callback.message,
            callback: function(){
                location.reload()
            }
        })
    }).fail(function (callback){
        callbackMsg = JSON.parse(callback.responseText)
        enviarMsg(callbackMsg.info)
    })
}