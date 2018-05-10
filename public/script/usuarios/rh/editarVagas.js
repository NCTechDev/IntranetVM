jQuery(document).ready(function (){
    $('.form-users').submit(function (event){
        event.preventDefault()
        validacaoEdicao()
    })
})

function validacaoEdicao(){
        //Mensagens de erros
        msgErrors = ""
        
            // Campos vazios
            if ($('#txtTitulo').val() == "" ||
                $('#txtDescricao').val() == ""
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

function enviarMsg(msg){
    $('#divResult').addClass("alert-danger")
    $('#result').html(msg)
    $('#divResult').fadeIn(500)
    return false
}

function setarValores(idvaga){
    $.ajax({
        url: "/retornarVagaPorId/" + idvaga,
        type: "get",
        dataType: "json",
        async: true,
    }).done(function (callback) {
        $("#txtIdVaga").val(idvaga)
        $("#txtTitulo").val(callback.vaga[0].titulo)
        $("#txtDescricao").val(callback.vaga[0].descricao)
        $("#selectUnidade").val(callback.vaga[0].unidade)
    })
}

function enviarDados(){
    $.ajax({
        url: "/editarVaga",
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

function mudarEstado(idvaga, estado){

    if( estado == 'aberto'){
        newEstado ={ newEstado : 'fechado'} 
        $.ajax({
            url: "/mudarEstado/" + idvaga,
            type: "post",
            dataType: "json",
            async: true,
            data: newEstado,
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
    } else {
        newEstado ={ newEstado : 'aberto'} 
        $.ajax({
            url: "/mudarEstado/" + idvaga,
            type: "post",
            dataType: "json",
            async: true,
            data: newEstado,
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
}
