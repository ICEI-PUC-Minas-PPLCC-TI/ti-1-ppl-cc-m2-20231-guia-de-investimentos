function fazerLogin() {
    var usernameInput = document.getElementById("username");
    var username = usernameInput.value;
  
    var usuarioLogadoElement = document.getElementById("usuarioLogado");
    usuarioLogadoElement.textContent = "Usuário logado: " + username;
  }
  