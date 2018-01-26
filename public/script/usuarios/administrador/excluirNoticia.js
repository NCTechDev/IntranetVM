function excluirNoticia(idnoticia, newPath){
    bootbox.confirm({
        message: "Deseja excluir a noticia ?",
        buttons: {
            confirm: {
                label: 'Sim',
                className: 'btn-danger',
                type: 'button'
            },
            cancel: {
                label: 'Não',
                className: 'btn-default'
            },
        },      
        callback: function (result){
            if (result == true){
                var dados = {idnoticia : idnoticia, newPath: newPath}

                $.ajax({
                    url: "/excluirNoticia",
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
            }else {
                
            }
        }
    })
}