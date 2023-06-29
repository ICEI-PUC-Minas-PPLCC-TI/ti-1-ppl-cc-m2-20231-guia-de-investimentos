document.addEventListener('DOMContentLoaded', function() {
  var searchInput = document.getElementById("search-input");
  var searchButton = document.getElementById("search-button");
  var searchResultsElement = document.getElementById("search-results");

  searchButton.addEventListener("click", function() {
    var searchTerm = searchInput.value.trim();

    // Limpar os resultados anteriores
    searchResultsElement.innerHTML = "";

    // Realizar a pesquisa na API interna com base no nome ou categoria
    var url = "http://localhost:3000/produtos";
    if (searchTerm !== "") {
      url += "?search=" + encodeURIComponent(searchTerm);
    }

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Exibir os resultados da pesquisa
        data.forEach(function(produto) {
          var cardElement = document.createElement("div");
          cardElement.classList.add("card");

          var imgElement = document.createElement("img");
          imgElement.src = produto.img;

          var nomeElement = document.createElement("h3");
          nomeElement.textContent = produto.nome;

          var precoElement = document.createElement("p");
          precoElement.textContent = "Preço: R$" + produto.preco.toFixed(2);

          var linkElement = document.createElement("a");
          linkElement.href = "detalhes.html?id=" + produto.id;
          linkElement.textContent = "Ver Detalhes";

          cardElement.appendChild(imgElement);
          cardElement.appendChild(nomeElement);
          cardElement.appendChild(precoElement);
          cardElement.appendChild(linkElement);

          searchResultsElement.appendChild(cardElement);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  });
});
