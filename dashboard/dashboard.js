/* eslint-disable no-undef */

// Carrega a API de visualização e o pacote principal de gráficos
google.charts.load('current', { packages: ['corechart'] })
google.charts.setOnLoadCallback(drawChart)

function getData(callback) {
  // Busca os dados no banco
  fetch('/dashboard')
    .then(response => response.json())
    .then(json => {
      callback(json)
    })
    .catch(() => {
      document.getElementById('chart_div').textContent =
        'Não foi possível carregar o dashboard, tente mais tarde.'
    })
}

function drawCard(totalCount) {
  // Desenha o cartão de total
  var card = document.getElementById('card_div')

  var cardTitle = document.createElement('h2')
  cardTitle.textContent = 'Total de Avaliações'

  var cardCount = document.createElement('p')
  cardCount.setAttribute('id', 'total_reviews')
  cardCount.textContent = totalCount

  card.append(...[cardTitle, cardCount])
}

function drawChart() {
  var chartDiv = document.getElementById('chart_div')
  chartDiv.textContent = 'Carregando...'

  // Chama a função de busca de dados e desenha o gráfico dentro do callback
  getData(json => {
    var { positiveCount, negativeCount, totalCount } = json

    // Cria a tabela de dados
    var dataTable = new google.visualization.DataTable()
    dataTable.addColumn('string', 'Sentimento')
    dataTable.addColumn('number', 'Quantidade')
    dataTable.addRows([
      ['Positivo', positiveCount],
      ['Nagativo', negativeCount]
    ])

    // Define as opções do gráfico
    var options = {
      title: 'Proporção de Avaliações por Sentimento',
      titleTextStyle: {
        fontSize: 14,
        bold: true
      },
      width: 500,
      height: 400
    }

    // Chama a função que desenha o cartão de total
    drawCard(totalCount)

    // Instancia e desenha o gráfico, passando os dados e as opções
    var chart = new google.visualization.PieChart(chartDiv)
    chart.draw(dataTable, options)
  })
}
