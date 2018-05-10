//Form submit
jQuery(document).ready(function (){
    $('.form-visitas').submit(function (event){
        event.preventDefault()
        validacaoRegistro()
    })
})

function validacaoRegistro(){
    //Mensagens de erros
    msgErrors = ""
    var dataAtual = new Date();
    
    var d = dataAtual.getDate();
    var m = dataAtual.getMonth() + 1;
    var y = dataAtual.getFullYear();
    var data = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

    // Campos vazios
    if ($('#txtRazaoSocial').val() == "" ||
        $('#txtData_Visita').val() == '' ||
        $('#txtEmail').val() == "" ||
        $('#selectUnidade').val() == "Selecione" ||
        $('#selectCidade').val() == "Selecione" ){
        msgErrors = "Verifique se os campos obrigatórios estão preenchidos!"
    }else if ( data < $('#txtData_Visita').val() ){
        msgErrors = "Data de visita deve ser menor ou igual a data atual!"
    } else if ($('#txtCelular').val() == "" && $('#txtFixo').val() == "" && $('#txtCelular2').val() == ""){
        msgErrors = "Preencha pelo menos um telefone fixo ou celular!"
    }

    //Campos incorretos
    if($('#txtFixo').val().length > 0){
        if($('#txtFixo').val().length !== 14){
            msgErrors = "Preencha o telefone fixo corretamente!"
        }
    }
    if($('#txtCelular').val().length > 0){
        if($('#txtCelular').val().length !== 15){
            msgErrors = "Preencha o telefone celular 1 corretamente!"
        }
    }
    if($('#txtCelular2').val().length > 0){
        if($('#txtCelular2').val().length !== 15){
            msgErrors = "Preencha o telefone celular 2 corretamente!"
        }
    }
    if($('#txtCnpj').val().length > 0){
        if($('#txtCnpj').val().length !== 18){
            msgErrors = "Preencha o CNPJ corretamente!"
        }
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
    $.ajax({
        url: "/cadastrarVisita",
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