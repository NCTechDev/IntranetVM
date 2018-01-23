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
    var dataAtual = new Date
    var data = dataAtual.getFullYear() + "-" + dataAtual.getMonth() + 1 + "-" + dataAtual.getUTCDate()

    // Campos vazios
    if ($('#txtTitulo').val() == "" ||
        $('#txtDescricao').val() == "" ||
        $('#txtData_Inicio').val() == '' ||
        $('#txtData_Fim').val() == '' ){
        msgErrors = "Todos Campos são obrigatórios"
    }

    //Validando Datas
    if ( data > $('#txtData_Fim').val() ){
        msgErrors = "Data de término está antes da data atual!"
    }

    if ( $('#txtData_Inicio').val() > $('#txtData_Fim').val() ){
        msgErrors = "Data de término está antes da data inicio!"
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
    if ($('#txtIdentificação').val() == 'editar'){

    } else {
        $.ajax({
            url: "/cadastroNoticia",
            type: "post",
            dataType: "json",
            async: true,
            data: $("form").serialize(),
            complete: function () {
                setTimeout(function () {
                    $('#btn-loading').button('reset')
                }, 1500)
            }
        }).done(function (callback) {
            window.location = "/administrador"
        }).fail(function (callback) {
            jsonCb = JSON.parse(callback.responseText)
            enviarMsg(jsonCb.message)
        })
    }
}

