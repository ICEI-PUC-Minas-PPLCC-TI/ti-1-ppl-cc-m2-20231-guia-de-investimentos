
var counter = 1;
var intervalId = setInterval(function() {
  document.getElementById(`radio${counter}`).checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }
}, 5000);