var counter = 1;
var slideWidth = 25; // Largura de cada slide em porcentagem

var intervalId = setInterval(function() {
  document.getElementById(`radio${counter}`).checked = true;
  document.querySelector('.slides').style.transform = `translateX(-${slideWidth * (counter - 1)}%)`; // Atualiza a posição dos slides
  counter++;
  if (counter > 4) {
    counter = 1;
  }
}, 5000);