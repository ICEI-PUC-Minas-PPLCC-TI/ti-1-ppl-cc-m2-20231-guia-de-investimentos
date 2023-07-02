function favoritarItem(item) {
  var favoritos = localStorage.getItem('favoritos');
  if (!favoritos) {
    favoritos = [];
  } else {
    favoritos = JSON.parse(favoritos);
  }

  favoritos.push(item);

  localStorage.setItem('favoritos', JSON.stringify(favoritos));

  alert('Item favoritado com sucesso!');
}

function removerItem(index) {
  var favoritos = localStorage.getItem('favoritos');
  if (favoritos) {
    favoritos = JSON.parse(favoritos);

    favoritos.splice(index, 1);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    exibirFavoritos();
  }
}

function exibirFavoritos() {
  var favoritos = localStorage.getItem('favoritos');
  if (favoritos) {
    favoritos = JSON.parse(favoritos);

    var listaFavoritos = document.getElementById('listaFavoritos');
    listaFavoritos.innerHTML = '';

    favoritos.forEach(function(item, index) {
      var li = document.createElement('li');
      li.textContent = item;

      var removerBtn = document.createElement('button');
      removerBtn.textContent = 'Remover';
      removerBtn.addEventListener('click', function() {
        removerItem(index);
      });

      li.appendChild(removerBtn);
      listaFavoritos.appendChild(li);

      var linkItem = document.createElement('a');
      linkItem.href = item.toLowerCase().replace(/\s/g, '') + '.html';
      linkItem.textContent = 'Ver detalhes';

      li.appendChild(linkItem);
    });
  }
}
