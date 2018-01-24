//Form submit
jQuery(document).ready(function (){
    $('.form-teste').submit(function (event){
        event.preventDefault()
        validacaoRegistro()
    })
})

function validacaoRegistro(){
    console.log("chegou")
    console.log($('#ImgUpload').val())
}