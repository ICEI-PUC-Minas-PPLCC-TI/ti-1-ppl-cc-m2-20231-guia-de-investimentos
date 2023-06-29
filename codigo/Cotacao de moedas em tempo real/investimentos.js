$(document).ready(function() {
  // Array com os símbolos das criptomoedas
  var symbols = ['bitcoin', 'ethereum', 'binancecoin', 'cardano'];

  // Função para formatar o preço com duas casas decimais
  function formatPrice(price) {
    return 'R$ ' + price.toFixed(2);
  }

  // Função para atualizar os valores na tabela
  function updateTable() {
    symbols.forEach(function(symbol) {
      // Faz a requisição AJAX para obter os dados da criptomoeda
      $.ajax({
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + symbol + '&vs_currencies=brl&include_24hr_change=true',
        method: 'GET',
        success: function(data) {
          // Obtém os valores do preço e da variação
          var price = data[symbol].brl;
          var change = data[symbol].brl_24h_change;

          // Atualiza os valores na tabela
          $('#' + symbol + '-price').text(formatPrice(price));
          $('#' + symbol + '-change').text(change.toFixed(2) + '%');

          // Adiciona a classe 'positive' ou 'negative' dependendo da variação
          if (change > 0) {
            $('#' + symbol + '-change').addClass('positive').removeClass('negative');
          } else {
            $('#' + symbol + '-change').addClass('negative').removeClass('positive');
          }
        },
        error: function() {
          console.log('Erro ao obter os dados da criptomoeda ' + symbol);
        }
      });
    });
  }

  // Chama a função de atualização da tabela inicialmente
  updateTable();

  // Atualiza a tabela a cada 5 segundos
  setInterval(updateTable, 5000);
});
