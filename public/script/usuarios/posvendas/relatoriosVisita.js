//Form submit
jQuery(document).ready(function (){
    $('.form-relatorios').submit(function (event){
        event.preventDefault()
        validacaoPesquisa()
    })
})

var headers = {
    data_visita: 'Data Visita'.replace(/,/g, ''), // remove commas to avoid errors
    data_cadastro: "Data Cadastro",
    idvisita: "Id Visita",
    nomeDeFantasia: "Nome De Fantasia",
    razao_social: "Razão Social",
    cnpj: "CNPJ",
    cidade: "Cidade",
    celular: "Celular",
    celular2: "Celular 2",
    fixo: "Fixo",
    email: "E-mail",
    observacao: "Observação",
    representante: "Representante"
};

var fileTitle = 'Visitas'; // or 'my-unique-title'

function validacaoPesquisa(){
    //Mensagens de erros
    msgErrors = ""


    // Campos vazios
    if ($('#txtData_Inicio').val() == '' ||
        $('#txtData_Fim').val() == '' ||
        $('#selectRepresentante').val() == "Representante" ){
        msgErrors = "Verifique se os campos obrigatórios estão preenchidos!"
    }

    //Validação data
    if($('#txtData_Inicio').val() > $('#txtData_Fim').val()){
        msgErrors = "Data de inicio deve ser inferior a data de término!"
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
        url: "/retornarVisita",
        type: "get",
        dataType: "json",
        data:$("form").serialize(),
        assync: true
    }).done(function (calback){
        criarTabela(calback.visita)
    })
}

function criarTabela(visita) {

    // Limpa table
    $("#tbodyVisitas tr").remove()
    $("#btnExcel button").remove()
    document.getElementById("txtTotal").innerHTML=""

    if (visita.length) {
        for (index = 0; index < visita.length; index++) {

            newTrItem = $("<tr>" +
                "<td>" + visita[index].data_visita + "</td>" +
                "<td>" + visita[index].razao_social + "</td>" +
                "<td>" + visita[index].cidade + "</td>" +
                "<td>" + visita[index].celular + "</td>" +
                "<td>" + visita[index].fixo + "</td>" +
                "<td>" + visita[index].email + "</td>" +
                "<td>" + visita[index].representante + "</td>" +
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modal-visitas' role='button' onclick='setarValores(" + JSON.stringify(visita[index].idvisita)+");'>Exibir</button></td>" +
                "</tr>")
            appendTable(newTrItem)
        }
        adicionarTotal(index)
        $("#btnExcel").append("<button type='button' class='btn btn-success' onclick='gerarExcel(" + JSON.stringify(headers) + "," + JSON.stringify(visita) + "," + JSON.stringify(fileTitle) + ")'; return false;'>Gerar Excel</button>")

    } else {
        newTrItem = $("<tr class='danger'><td colspan='6'>Nenhum resultado encontrado.</td></tr>")
        appendTable(newTrItem)
    }
}

function appendTable(newTrItem) {
    $("#tbodyVisitas").append(newTrItem)
}

function adicionarTotal(total){
    document.getElementById("txtTotal").innerHTML="Total de visitas: " + total;
}

function gerarExcel(headers, items, fileTitle){
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv; charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function setarValores(idvisita){
    $.ajax({
        url: "/retornarVisitaPorId/" + idvisita,
        type: "get",
        dataType: "json",
        async: true,
    }).done(function (callback) {
        $("#txtIdVisita").val(callback.visita[0].idvisita)
        $("#txtData_Visita").val(callback.visita[0].data_visita)
        $("#txtData_Cadastro").val(callback.visita[0].data_cadastro)
        $("#txtNomeFantasia").val(callback.visita[0].nomeDeFantasia)
        $("#txtRepresentante").val(callback.visita[0].representante)
        $("#txtRazaoSocial").val(callback.visita[0].razao_social)
        $("#txtCnpj").val(callback.visita[0].cnpj)
        $("#txtCidade").val(callback.visita[0].cidade)
        $("#txtCelular").val(callback.visita[0].celular)
        $("#txtCelular2").val(callback.visita[0].celular2)
        $("#txtFixo").val(callback.visita[0].fixo)
        $("#txtEmail").val(callback.visita[0].email)
        $("#txtObservacao").val(callback.visita[0].observacao)
    })
}