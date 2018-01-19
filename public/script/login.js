//Formulário de login
jQuery(document).ready(function(){
    $('.form-users').submit(function (event){
        event.preventDefault()
        validacaoLogin()
    })
})

//Validação
function validacaoLogin() {
    //Mensagens de erros
    msgErros = ""

    //Campos Vazios
    if ($('#txtUsuario').val() == "" || $('#txtSenha_Acesso').val() == ""){
        msgErros = ("Preencha todos os campos. <br />")
    }

    //Envia msg erros
    if (msgErros) {
        enviarMsg(msgErros)
    } else {
        enviarMsg(msgErros)
        $('#divResult').removeClass("alert-danger")
        enviarDados()
    }

}

//Mostra mensagens de erros
function enviarMsg(msg){
    $('#divResult').addClass("alert-danger")
    $('#result').html(msg)
    $('#divResult').fadeIn(500)
    return false
}

// Envia forms via AJAX
function enviarDados(){
    $.ajax({
        url: "/login",
        type: "post",
        dataType: "json",
        async: true,
        data: $("form").serialize()
    }).done(function(){
        window.location = "/access"
    }).fail(function (callback){
        callbackMsg = JSON.parse(callback.responseText)
        enviarMsg(callbackMsg.info)
    })
}