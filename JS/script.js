var dadosMapa = [
    ['País', 'Casos'],
    ['0', 0]
]

async function carregarDados() {
    const divErro = document.getElementById('div-erro');
    divErro.style.display = 'none';

    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries')   //Endpoint da API
        .then(response => response.json())    // Obtendo resposta da API
        .then(dados => prepararDados(dados))  // Obtendo os dados
        .catch(e => exibirErro(e.message));   // Obtendo erro (se der erro)
}

function prepararDados(dados) {

    dadosMapa = [
        ['País', 'Casos'],
    ]
    for (let i = 0; i < dados['data'].length; i++) {
        dadosMapa.push([dados['data'][i].country, dados['data'][i].confirmed])
    }
    console.table(dadosMapa);
    drawRegionsMap()
}

google.charts.load('current', {
    'packages': ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable(dadosMapa);

    var options = {backgroundColor:'#64e2FF', colorAxis: {colors: ['#4faff8', 'blue']}};

    var chart = new google.visualization.GeoChart(document.getElementById('mapa-mundi'));

    chart.draw(data, options);
}


//   ===========================================================================================


var dadosPizza = [['Dados', 0]]



google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable(dadosPizza);

    var options = {
        title: 'Porcentagem de casos e mortes por Covid-19',
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('Grafico'));
    chart.draw(data, options);
}


async function carregarDadosGrafico() {
    const divErro = document.getElementById('div-erro');
    divErro.style.display = 'none';
    
    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries')   //Endpoint da API
        .then( response => response.json() )    // Obtendo resposta da API
        .then( dados => prepararDadosGrafico(dados) )  // Obtendo os dados
        .catch( e => exibirErro(e.message) );   // Obtendo erro (se der erro)
  }

function prepararDadosGrafico(dados) {

    dadosPizza = [['Dados', 'valor']]
    let mortes = 0;
    let confirmados = 0;
    for (let i = 0; i<dados['data'].length; i++) {
        mortes += dados['data'][i].deaths;
        confirmados+= dados['data'][i].confirmed;
    }
    console.log(mortes);
    console.log(confirmados);
    dadosPizza.push(['Casos confirmados', confirmados])
    dadosPizza.push(['Mortes', mortes])
    drawChart()
}

//   ===========================================================================================

async function carregarDadosTabela() {
    // ocultar a div de erro (se estiver visível)
    const divErro = document.getElementById('div-erro');
    divErro.style.display = 'none';
    
    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1')   //Endpoint da API
        .then( response => response.json() )    // Obtendo resposta da API
        .then( dadosTabela => prepararDadosTabela(dadosTabela) )  // Obtendo os dados
        .catch( e => exibirErro(e.message) );   // Obtendo erro (se der erro)
}

// Função para exibir mensagens de erro
function exibirErro(mensagem) {
    const divErro = document.getElementById('div-erro');
    divErro.style.display = 'block';
    divErro.innerHTML = '<b>Erro ao acessar a API</b><br />' + mensagem; 
}

// Função para preparar e exibir os dados no HTML
function prepararDadosTabela(dadosTabela) {
    // Criando variável para controlar as linhas da tbody
    let linhas = document.getElementById('linhas');
    linhas.innerHTML = '';
    
    // Laço para percorrer todos os dados recebidos
    for (let i=0; i<dadosTabela['data'].length; i++) {
        let auxLinha = '';

        if (i %2 !=0)
            auxLinha = '<tr class="listra">';
        else 
            auxLinha = '<tr>';

        auxLinha += '<td>' + dadosTabela['data'][i].uf + '</td>' +
                    '<td>' + dadosTabela['data'][i].state + '</td>' +
                    '<td>' + dadosTabela['data'][i].cases + '</td>' +
                    '<td>' + dadosTabela['data'][i].deaths + '</td>' +
                    '<td>' + dadosTabela['data'][i].suspects + '</td>' +
                    '<td>' + dadosTabela['data'][i].refuses + '</td>' +
                '</tr>';

        linhas.innerHTML += auxLinha;
    }
}


function exibirErro(mensagerm) {
    
}

document.addEventListener(  "DOMContentLoaded",
                            function(event) {
                                carregarDados();
                                carregarDadosGrafico();
                                carregarDadosTabela();
                            }
);
