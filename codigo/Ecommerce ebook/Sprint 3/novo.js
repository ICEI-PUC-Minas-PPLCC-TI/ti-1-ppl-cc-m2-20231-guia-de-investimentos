var tableBody = document.querySelector('#cryptoTable tbody');

function fetchData() {
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,ripple,cardano,polkadot,chainlink,stellar,vechain,uniswap&vs_currencies=brl&include_24hr_change=true')
    .then(response => response.json())
    .then(data => {
      tableBody.innerHTML = ''; // Limpa o conteúdo da tabela

      for (const coin in data) {
        var row = document.createElement('tr');
        var nameCell = document.createElement('td');
        var priceCell = document.createElement('td');
        var changeCell = document.createElement('td');

        nameCell.textContent = coin;
        priceCell.textContent = 'R$' + data[coin].brl.toLocaleString();
        changeCell.textContent = data[coin].brl_24h_change.toFixed(2) + '%';

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(changeCell);
        tableBody.appendChild(row);
      }
    })
    .catch(error => {
      console.log('Ocorreu um erro ao obter os dados das moedas:', error);
    });
}

// Chama a função fetchData inicialmente
fetchData();

// Atualiza os valores a cada 30 segundos
setInterval(fetchData, 30000);
