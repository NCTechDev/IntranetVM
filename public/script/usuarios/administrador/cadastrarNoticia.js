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

function enviarMsg(msg) {
    $('#divResult').addClass("alert-danger")
    $('#result').html(msg)
    $('#divResult').fadeIn(500)
    return false
}

function enviarDados(){

    var formData = new FormData($('form')[0])

    if ($('#txtIdentificação').val() == 'editar'){

    } else {
        $.ajax({
            url: "/cadastroNoticia",
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
}

