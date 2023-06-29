// Função para atualizar os valores da tabela
function atualizarValores() {
    // Simulação de requisição para obter os valores atualizados
    // Substitua este código com a lógica real de obtenção dos dados
    setTimeout(function() {
      // Dados de exemplo para atualizar os valores da tabela
      const dadosAtualizados = [
        { moeda: "Bitcoin", preco: "$52,000", variacao: "+5.8%" },
        { moeda: "Ethereum", preco: "$2,600", variacao: "-1.5%" },
        // Adicione os dados das outras criptomoedas aqui
      ];
  
      // Atualiza os valores na tabela
      dadosAtualizados.forEach(function(dado) {
        const moedaCell = document.querySelector(`#crypto-table td:first-child:contains('${dado.moeda}')`);
        if (moedaCell) {
          const precoCell = moedaCell.nextElementSibling;
          const variacaoCell = precoCell.nextElementSibling;
          precoCell.textContent = dado.preco;
          variacaoCell.textContent = dado.variacao;
        }
      });
  
      // Chama a função novamente após um intervalo de tempo
      atualizarValores();
    }, 5000); // Atualiza a cada 5 segundos (5000 milissegundos)
  }
  
  // Inicia a atualização dos valores
  atualizarValores();